"""The boundaries of the judicial arrondissements, and the arrondissement of a point"""

from functools import cache

from ._data import load
from ._geometry import BoundingBox, bounding_box, contains, in_box, require_coordinates
from ._territory import get_arrondissement
from ._time import Day, applying_on, pick_version, versions_by_id
from .types import Arrondissement, ArrondissementBoundary

ARRONDISSEMENT_BOUNDARIES_COVERAGE_FROM = '2026-10-21'
"""The boundaries describe the situation from the day the NGI's file was first read for them. A
boundary the NGI changes replaces the previous one; an arrondissement the NGI drops keeps its
boundary with a `validTo`. Lookups for an earlier day raise a `ValueError`."""

_DATASET = 'arrondissement boundaries'


@cache
def arrondissement_boundaries() -> tuple[ArrondissementBoundary, ...]:
    """Every boundary, every version, read on first use"""
    return tuple(load('arrondissement-boundaries'))


@cache
def _by_id() -> dict[str, list[ArrondissementBoundary]]:
    return versions_by_id(arrondissement_boundaries())


def get_arrondissement_boundary(id: str, on: Day | None = None) -> ArrondissementBoundary | None:
    """The boundary of an arrondissement, by arrondissement id: today's version, or the one of a
    given day"""
    return pick_version(_by_id().get(id), on, ARRONDISSEMENT_BOUNDARIES_COVERAGE_FROM, _DATASET)


@cache
def _index() -> list[tuple[ArrondissementBoundary, BoundingBox]]:
    return [
        (boundary, bounding_box(boundary['geometry'])) for boundary in arrondissement_boundaries()
    ]


def find_arrondissements_at(
    longitude: float, latitude: float, on: Day | None = None
) -> list[Arrondissement]:
    """The arrondissements whose boundary holds a point, on a day (today by default). Longitude
    first, then latitude, in decimal degrees (WGS 84), as GeoJSON orders them. One arrondissement
    for a point in Belgium; none outside it; two for a point on the line between two. Raises
    `ValueError` for coordinates that aren't finite numbers, or a day before the coverage."""
    require_coordinates(longitude, latitude)
    applying = {
        id(boundary)
        for boundary in applying_on(
            arrondissement_boundaries(), on, ARRONDISSEMENT_BOUNDARIES_COVERAGE_FROM, _DATASET
        )
    }
    found = []
    for boundary, box in _index():
        if (
            id(boundary) in applying
            and in_box(box, longitude, latitude)
            and contains(boundary['geometry'], longitude, latitude)
        ):
            # Every boundary belongs to an arrondissement that applies on the same days
            # (test/arrondissement-boundaries.test.ts)
            arrondissement = get_arrondissement(boundary['arrondissement'], on)
            if arrondissement:
                found.append(arrondissement)
    return found
