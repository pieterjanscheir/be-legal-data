"""Judicial areas, arrondissements, cantons, regions, provinces and municipalities"""

from collections.abc import Mapping
from functools import cache
from typing import cast

from ._data import load
from ._time import Day, applying_on, pick_version, versions_by_id
from .types import Arrondissement, Canton, JudicialArea, Municipality, Province, Region

TERRITORY_COVERAGE_FROM = '2025-01-01'
"""The territory data describes the situation from this day on: the annex to the Judicial Code as
amended for the municipal mergers of 1 January 2025, and Statbel's municipalities of that day.
Lookups for an earlier day raise a `ValueError` rather than answer with today's map."""


def judicial_areas() -> tuple[JudicialArea, ...]:
    """Every judicial area, every version"""
    return cast(tuple[JudicialArea, ...], _records('judicial-areas'))


def arrondissements() -> tuple[Arrondissement, ...]:
    """Every judicial arrondissement, every version"""
    return cast(tuple[Arrondissement, ...], _records('arrondissements'))


def regions() -> tuple[Region, ...]:
    """Every region, every version"""
    return cast(tuple[Region, ...], _records('regions'))


def provinces() -> tuple[Province, ...]:
    """Every province, every version"""
    return cast(tuple[Province, ...], _records('provinces'))


def municipalities() -> tuple[Municipality, ...]:
    """Every municipality, every version"""
    return cast(tuple[Municipality, ...], _records('municipalities'))


def cantons() -> tuple[Canton, ...]:
    """Every judicial canton, every version"""
    return cast(tuple[Canton, ...], _records('cantons'))


@cache
def _records(name: str) -> tuple[Mapping[str, object], ...]:
    return tuple(load(name))


@cache
def _by_id(name: str) -> dict[str, list[Mapping[str, object]]]:
    return versions_by_id(_records(name))


@cache
def _cantons_by_municipality() -> dict[str, list[Canton]]:
    found: dict[str, list[Canton]] = {}
    for canton in cantons():
        for entry in canton['municipalities']:
            found.setdefault(entry['municipality'], []).append(canton)
    return found


def _pick(name: str, id: str, on: Day | None) -> Mapping[str, object] | None:
    return pick_version(_by_id(name).get(id), on, TERRITORY_COVERAGE_FROM, 'territory')


# Each lookup by id gives the record as it is today, or with `on` the version of that day. A day
# before the data's coverage raises a ValueError.


def get_judicial_area(id: str, on: Day | None = None) -> JudicialArea | None:
    """A judicial area by id, e.g. 'gent'"""
    return cast(JudicialArea | None, _pick('judicial-areas', id, on))


def get_arrondissement(id: str, on: Day | None = None) -> Arrondissement | None:
    """A judicial arrondissement by id, e.g. 'oost-vlaanderen'"""
    return cast(Arrondissement | None, _pick('arrondissements', id, on))


def get_region(id: str, on: Day | None = None) -> Region | None:
    """A region by its REFNIS code: '02000' Flemish, '03000' Walloon, '04000' Brussels-Capital"""
    return cast(Region | None, _pick('regions', id, on))


def get_province(id: str, on: Day | None = None) -> Province | None:
    """A province by its REFNIS code, e.g. '40000' for Oost-Vlaanderen"""
    return cast(Province | None, _pick('provinces', id, on))


def get_municipality(id: str, on: Day | None = None) -> Municipality | None:
    """A municipality by its REFNIS code, e.g. '44021' for Gent"""
    return cast(Municipality | None, _pick('municipalities', id, on))


def get_canton(id: str, on: Day | None = None) -> Canton | None:
    """A judicial canton by id, e.g. 'gent-1'"""
    return cast(Canton | None, _pick('cantons', id, on))


def get_cantons_for_municipality(id: str, on: Day | None = None) -> list[Canton]:
    """The cantons that cover a municipality on a day (today by default), by REFNIS code. One
    canton for most municipalities; several for cities that are split (Antwerpen, Gent, Brussel,
    …), in which case the street address decides and each canton's `territory` describes its
    part."""
    return applying_on(
        _cantons_by_municipality().get(id, []), on, TERRITORY_COVERAGE_FROM, 'territory'
    )


def get_arrondissement_for_municipality(id: str, on: Day | None = None) -> Arrondissement | None:
    """The judicial arrondissement a municipality lies in on a day (today by default), by REFNIS
    code. Every municipality lies in exactly one, even a city split over several cantons."""
    found = get_cantons_for_municipality(id, on)
    return get_arrondissement(found[0]['arrondissement'], on) if found else None


def get_province_for_municipality(id: str, on: Day | None = None) -> Province | None:
    """The province a municipality lies in on a day (today by default), by REFNIS code. None for
    the 19 municipalities of the Brussels-Capital Region, which has no province: use
    `get_region_for_municipality` there."""
    municipality = get_municipality(id, on)
    return get_province(municipality['province'], on) if municipality else None


def get_region_for_municipality(id: str, on: Day | None = None) -> Region | None:
    """The region a municipality lies in on a day (today by default), by REFNIS code"""
    municipality = get_municipality(id, on)
    return get_region(municipality['region'], on) if municipality else None
