"""The boundaries of the judicial cantons, and the canton of a point"""

import math
from functools import cache
from itertools import pairwise

from ._data import load
from ._territory import get_canton
from ._time import Day, applying_on, pick_version, versions_by_id
from .types import Canton, CantonBoundary, MultiPolygon, Position, Ring

CANTON_BOUNDARIES_COVERAGE_FROM = '2026-10-21'
"""The boundaries describe the situation from the day the NGI's file was first read. A boundary
the NGI changes replaces the previous one; a canton the NGI drops keeps its boundary with a
`validTo`. Lookups for an earlier day raise a `ValueError`."""

_DATASET = 'canton boundaries'

# A point within a centimetre of an edge counts as on it (degrees; a metre is about 1e-5)
_ON_EDGE = 1e-7

BoundingBox = tuple[float, float, float, float]


@cache
def canton_boundaries() -> tuple[CantonBoundary, ...]:
    """Every boundary, every version. About 22 MB of JSON, read on first use."""
    return tuple(load('canton-boundaries'))


@cache
def _by_id() -> dict[str, list[CantonBoundary]]:
    return versions_by_id(canton_boundaries())


def get_canton_boundary(id: str, on: Day | None = None) -> CantonBoundary | None:
    """The boundary of a canton, by canton id: today's version, or the one of a given day"""
    return pick_version(_by_id().get(id), on, CANTON_BOUNDARIES_COVERAGE_FROM, _DATASET)


def _bounding_box(geometry: MultiPolygon) -> BoundingBox:
    # The holes lie within the exterior ring, so every ring may go in
    positions = [p for polygon in geometry['coordinates'] for ring in polygon for p in ring]
    return (
        min(p[0] for p in positions),
        min(p[1] for p in positions),
        max(p[0] for p in positions),
        max(p[1] for p in positions),
    )


def _on_segment(a: Position, b: Position, lon: float, lat: float) -> bool:
    """Whether a point lies on the segment from a to b, give or take _ON_EDGE"""
    outside = max(
        min(a[0], b[0]) - lon,
        lon - max(a[0], b[0]),
        min(a[1], b[1]) - lat,
        lat - max(a[1], b[1]),
    )
    if outside > _ON_EDGE:
        return False
    cross = (b[0] - a[0]) * (lat - a[1]) - (b[1] - a[1]) * (lon - a[0])
    return abs(cross) <= _ON_EDGE * math.hypot(b[0] - a[0], b[1] - a[1])


def _in_ring(ring: Ring, lon: float, lat: float) -> bool:
    """Even-odd ray casting over a closed ring; a point on the ring counts as inside"""
    inside = False
    for previous, current in pairwise(ring):
        if _on_segment(previous, current, lon, lat):
            return True
        ax, ay = previous
        bx, by = current
        if (ay > lat) != (by > lat) and lon < (bx - ax) * (lat - ay) / (by - ay) + ax:
            inside = not inside
    return inside


def _contains(geometry: MultiPolygon, lon: float, lat: float) -> bool:
    return any(
        polygon
        and _in_ring(polygon[0], lon, lat)
        and not any(_in_ring(hole, lon, lat) for hole in polygon[1:])
        for polygon in geometry['coordinates']
    )


@cache
def _index() -> list[tuple[CantonBoundary, BoundingBox]]:
    return [(boundary, _bounding_box(boundary['geometry'])) for boundary in canton_boundaries()]


def find_cantons_at(longitude: float, latitude: float, on: Day | None = None) -> list[Canton]:
    """The cantons whose boundary holds a point, on a day (today by default). Longitude first,
    then latitude, in decimal degrees (WGS 84), as GeoJSON orders them. One canton for a point in
    Belgium; none outside it; two for a point on the line between two cantons. The boundary is the
    NGI's digitisation of the annex to the Judicial Code: where a point lies close to a boundary,
    the canton's `territory` text decides. Raises `ValueError` for coordinates that aren't finite
    numbers, or a day before the coverage."""
    if not (math.isfinite(longitude) and math.isfinite(latitude)):
        raise ValueError(
            f'Expected a longitude and a latitude in decimal degrees, got {longitude}, {latitude}'
        )
    applying = {
        id(boundary)
        for boundary in applying_on(
            canton_boundaries(), on, CANTON_BOUNDARIES_COVERAGE_FROM, _DATASET
        )
    }
    found = []
    for boundary, (min_lon, min_lat, max_lon, max_lat) in _index():
        if (
            id(boundary) in applying
            and min_lon <= longitude <= max_lon
            and min_lat <= latitude <= max_lat
            and _contains(boundary['geometry'], longitude, latitude)
        ):
            # Every boundary belongs to a canton that applies on the same days
            # (tests/test_data.py)
            canton = get_canton(boundary['canton'], on)
            if canton:
                found.append(canton)
    return found
