"""Where the courts are on the map"""

from functools import cache

from ._data import load
from ._time import Day, pick_version, versions_by_id
from .types import CourtLocation

COURT_LOCATIONS_COVERAGE_FROM = '2026-10-21'
"""The locations describe the situation from the day the NGI's file was first read for them. A
point the NGI moves replaces the previous one; a point the NGI drops, or that stops matching the
court's address, keeps its record with a `validTo`. Lookups for an earlier day raise a
`ValueError`."""

_DATASET = 'court locations'


@cache
def court_locations() -> tuple[CourtLocation, ...]:
    """Every location, every version, read on first use"""
    return tuple(load('court-locations'))


@cache
def _by_id() -> dict[str, list[CourtLocation]]:
    return versions_by_id(court_locations())


def get_court_location(id: str, on: Day | None = None) -> CourtLocation | None:
    """Where a court is on the map, by court id: today's version, or the one of a given day. None
    for a court the NGI has no point for (only justices of the peace have one), or whose point is
    at another address than the court's."""
    return pick_version(_by_id().get(id), on, COURT_LOCATIONS_COVERAGE_FROM, _DATASET)
