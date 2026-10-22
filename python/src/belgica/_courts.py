"""Courts, their divisions and seats, and their names"""

from functools import cache
from typing import Literal

from ._data import load
from ._territory import cantons
from ._time import (
    Day,
    applying_on,
    current_version,
    pick_version,
    today,
    versions_by,
    versions_by_id,
)
from .types import Canton, Court, CourtKind, CourtType, Locale

COURTS_COVERAGE_FROM = '2025-01-01'
"""The courts data describes the situation from this day on, like the territory. Addresses and
contacts are as the portal showed them on `sources[].retrieved`; a record the portal stops listing
keeps its id and gets a `validTo`, and one it starts listing gets a `validFrom`. Lookups for an
earlier day raise a `ValueError`."""


@cache
def courts() -> tuple[Court, ...]:
    """Every record, every version: see `get_court` and `find_courts` for the ones that apply on
    a day"""
    return tuple(load('courts'))


@cache
def _indexes() -> tuple[
    dict[str, list[Court]], dict[str, list[Court]], dict[str, list[Court]], dict[str, list[Court]]
]:
    by_id = versions_by_id(courts())
    justices_by_canton = versions_by(
        courts(),
        lambda court: (
            court.get('canton')
            if court['type'] == 'justice-of-the-peace' and court['kind'] == 'court'
            else None
        ),
    )
    divisions: dict[str, list[Court]] = {}
    by_canton: dict[str, list[Court]] = {}
    for court in courts():
        if 'court' in court:
            divisions.setdefault(court['court'], []).append(court)
        if court['kind'] == 'court':
            for canton in court.get('cantons', []):
                by_canton.setdefault(canton, []).append(court)
            if 'canton' in court:
                by_canton.setdefault(court['canton'], []).append(court)
    return by_id, justices_by_canton, divisions, by_canton


def get_court(id: str, on: Day | None = None) -> Court | None:
    """A court, division or seat by id, e.g. 'justice-of-the-peace-gent-1': today's version, or
    the one of a given day"""
    return pick_version(_indexes()[0].get(id), on, COURTS_COVERAGE_FROM, 'courts')


def get_justice_of_the_peace(canton_id: str, on: Day | None = None) -> Court | None:
    """The justice of the peace of a canton, by canton id ('gent-1', 'merelbeke-melle'). One that
    sits in several places (Philippeville) has no address of its own: its seats do, see
    `get_divisions`."""
    return pick_version(_indexes()[1].get(canton_id), on, COURTS_COVERAGE_FROM, 'courts')


def get_divisions(court_id: str, on: Day | None = None) -> list[Court]:
    """A court's divisions, or a justice of the peace's seats, on a day (today by default); empty
    for a court without"""
    return applying_on(_indexes()[2].get(court_id, []), on, COURTS_COVERAGE_FROM, 'courts')


def get_courts_for_canton(canton_id: str, on: Day | None = None) -> list[Court]:
    """The courts whose area holds a canton on a day (today by default), by canton id: its
    justice of the peace and, of each other type, the court (not its divisions) that covers it;
    in Brussels, both language courts of a type. Empty for an unknown canton."""
    return applying_on(_indexes()[3].get(canton_id, []), on, COURTS_COVERAGE_FROM, 'courts')


def find_courts(
    *,
    type: CourtType | None = None,
    kind: CourtKind | None = None,
    arrondissement: str | None = None,
    judicial_area: str | None = None,
    on: Day | None = None,
) -> list[Court]:
    """The courts that match every given filter and apply on a day (today by default); no filter
    gives every court"""
    return [
        court
        for court in applying_on(courts(), on, COURTS_COVERAGE_FROM, 'courts')
        if (not type or court['type'] == type)
        and (not kind or court['kind'] == kind)
        and (not arrondissement or court.get('arrondissement') == arrondissement)
        and (not judicial_area or court['judicialArea'] == judicial_area)
    ]


# The language to fall back to when a court doesn't publish in the one asked for. A court
# publishes in one language, except in Brussels (Dutch and French) and the German-speaking area
# (German and French), so this is the court's own language in all but those.
_FALLBACK_ORDER: dict[Locale, tuple[Locale, ...]] = {
    'nl': ('nl', 'fr', 'de'),
    'fr': ('fr', 'nl', 'de'),
    'de': ('de', 'fr', 'nl'),
}

_LABEL: dict[Locale, tuple[str, str]] = {
    'nl': ('Vredegerecht', 'kanton'),
    'fr': ('Justice de paix', 'canton'),
    'de': ('Friedensgericht', 'Kanton'),
}


def _ordinal(locale: Locale, n: int) -> str:
    if locale == 'fr':
        return '1er' if n == 1 else f'{n}e'
    return f'{n}e' if locale == 'nl' else f'{n}.'


@cache
def _cantons_by_id() -> dict[str, list[Canton]]:
    return versions_by_id(cantons())


def format_court_name(
    court: Court, locale: Locale, style: Literal['official', 'canton'] = 'official'
) -> str:
    """A court's name in a language.

    With `style='official'` (the default), the name as the court publishes it. A court that
    doesn't publish in `locale` gives its name in another language: for Dutch, French then
    German; for French, Dutch then German; for German, French then Dutch.

    With `style='canton'`, a justice of the peace gets a label built from its canton's number and
    name: 'Vredegerecht 1e kanton Gent', 'Justice de paix 1er canton Gand', 'Friedensgericht 1.
    Kanton Gent', and without a number 'Vredegerecht kanton Deinze'. It is a label for display,
    not the court's official name. Only the cantons of Eupen-Sankt Vith have a German name; for
    the others, German uses the canton's name in the court's own language (French in Brussels).
    Any other court, and a seat of a justice of the peace, gets its official name.
    """
    name = court['name']
    if style == 'canton' and court['type'] == 'justice-of-the-peace' and court['kind'] == 'court':
        versions = _cantons_by_id().get(court.get('canton', ''))
        # The canton as it was on the court's last day, or today for a court that still applies
        canton = versions and current_version(versions, court.get('validTo', today()))
        if canton:
            # Most cantons have no German name: then the one in the court's own language
            own: Literal['nl', 'fr'] = 'nl' if 'nl' in name and 'fr' not in name else 'fr'
            canton_name = canton['name'].get(locale) or canton['name'][own]
            kind, word = _LABEL[locale]
            number = f'{_ordinal(locale, canton["number"])} ' if 'number' in canton else ''
            return f'{kind} {number}{word} {canton_name}'
    for language in _FALLBACK_ORDER[locale]:
        if language in name:
            return name[language]
    raise ValueError(f"Court '{court['id']}' has no name")
