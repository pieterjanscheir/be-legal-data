"""The boundaries of the judicial cantons, and the canton of a point"""

from functools import cache

from ._data import load
from ._geometry import BoundingBox, bounding_box, contains, in_box, require_coordinates
from ._territory import get_canton
from ._time import Day, applying_on, pick_version, versions_by_id
from .types import Canton, CantonBoundary

CANTON_BOUNDARIES_COVERAGE_FROM = '2026-10-21'
"""The boundaries describe the situation from the day the NGI's file was first read. A boundary
the NGI changes replaces the previous one; a canton the NGI drops keeps its boundary with a
`validTo`. Lookups for an earlier day raise a `ValueError`."""

_DATASET = 'canton boundaries'


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


@cache
def _index() -> list[tuple[CantonBoundary, BoundingBox]]:
    return [(boundary, bounding_box(boundary['geometry'])) for boundary in canton_boundaries()]


def find_cantons_at(longitude: float, latitude: float, on: Day | None = None) -> list[Canton]:
    """The cantons whose boundary holds a point, on a day (today by default). Longitude first,
    then latitude, in decimal degrees (WGS 84), as GeoJSON orders them. One canton for a point in
    Belgium; none outside it; two for a point on the line between two cantons. The boundary is the
    NGI's digitisation of the annex to the Judicial Code: where a point lies close to a boundary,
    the canton's `territory` text decides. Raises `ValueError` for coordinates that aren't finite
    numbers, or a day before the coverage."""
    require_coordinates(longitude, latitude)
    applying = {
        id(boundary)
        for boundary in applying_on(
            canton_boundaries(), on, CANTON_BOUNDARIES_COVERAGE_FROM, _DATASET
        )
    }
    found = []
    for boundary, box in _index():
        if (
            id(boundary) in applying
            and in_box(box, longitude, latitude)
            and contains(boundary['geometry'], longitude, latitude)
        ):
            # Every boundary belongs to a canton that applies on the same days
            # (tests/test_data.py)
            canton = get_canton(boundary['canton'], on)
            if canton:
                found.append(canton)
    return found
