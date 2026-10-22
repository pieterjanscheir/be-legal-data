"""Prisons and houses of justice"""

from functools import cache

from ._data import load
from ._time import Day, pick_version, versions_by_id
from .types import HouseOfJustice, Prison

PRISONS_COVERAGE_FROM = '2026-10-20'
"""The prisons data describes the situation from the day the FPS Justice site was first read. A
prison the site stops listing keeps its id and gets a `validTo`; one it starts listing gets a
`validFrom`. Lookups for an earlier day raise a `ValueError`."""

HOUSES_OF_JUSTICE_COVERAGE_FROM = '2026-10-20'
"""The houses-of-justice data describes the situation from the day the Communities' sites were
first read. Lookups for an earlier day raise a `ValueError`."""


@cache
def prisons() -> tuple[Prison, ...]:
    """Every prison and detention house, every version"""
    return tuple(load('prisons'))


@cache
def houses_of_justice() -> tuple[HouseOfJustice, ...]:
    """Every house of justice, every version"""
    return tuple(load('houses-of-justice'))


@cache
def _prisons_by_id() -> dict[str, list[Prison]]:
    return versions_by_id(prisons())


@cache
def _houses_by_id() -> dict[str, list[HouseOfJustice]]:
    return versions_by_id(houses_of_justice())


def get_prison(id: str, on: Day | None = None) -> Prison | None:
    """A prison by id, e.g. 'gevangenis-gent': today's version, or the one of a given day"""
    return pick_version(_prisons_by_id().get(id), on, PRISONS_COVERAGE_FROM, 'prisons')


def get_house_of_justice(id: str, on: Day | None = None) -> HouseOfJustice | None:
    """A house of justice by id, e.g. 'justitiehuis-gent': today's version, or the one of a given
    day"""
    return pick_version(
        _houses_by_id().get(id), on, HOUSES_OF_JUSTICE_COVERAGE_FROM, 'houses of justice'
    )
