"""Which courts have jurisdiction over a municipality or a postal code"""

from dataclasses import dataclass

from ._courts import get_courts_for_canton, get_justice_of_the_peace
from ._postal_codes import get_municipalities_for_postal_code
from ._territory import get_cantons_for_municipality
from ._time import Day
from .types import Canton, Court, CourtType, Municipality


@dataclass(frozen=True)
class CantonCourt:
    canton: Canton
    court: Court
    """The canton's justice of the peace"""
    partial: bool
    """The canton covers only part of the municipality: the street address decides, and the
    canton's `territory` says which part"""


@dataclass(frozen=True)
class PostalCodeCourts:
    municipality: Municipality
    """One of the municipalities the postal code belongs to"""
    justices_of_the_peace: list[CantonCourt]
    """Its justices of the peace: one, or several for a city split over cantons"""
    courts: list[Court]
    """Its courts of the type asked for, as `find_courts_with_jurisdiction` gives them"""


def find_justices_of_the_peace(municipality_id: str, on: Day | None = None) -> list[CantonCourt]:
    """The justices of the peace for a municipality on a day (today by default), by REFNIS code:
    one for most municipalities, several for a city split over cantons."""
    found = []
    for canton in get_cantons_for_municipality(municipality_id, on):
        # Every canton has its court on every day of the coverage (tests/test_data.py)
        court = get_justice_of_the_peace(canton['id'], on)
        if court:
            partial = any(
                entry['municipality'] == municipality_id and entry.get('partial') is True
                for entry in canton['municipalities']
            )
            found.append(CantonCourt(canton, court, partial))
    return found


def find_courts_with_jurisdiction(
    municipality_id: str, type: CourtType, on: Day | None = None
) -> list[Court]:
    """The courts of a type with jurisdiction over a municipality on a day (today by default), by
    REFNIS code: the courts whose area, as the law sets it, holds one of its cantons. One court for most
    municipalities; in Brussels the Dutch- and the French-speaking court; for a city split over
    cantons, every justice of the peace that serves one of them (the street address decides, see
    `find_justices_of_the_peace`). The court as a whole: which of its divisions hears a case is
    set by royal decree and isn't in the data; see `get_divisions`. Empty for an unknown code."""
    found: dict[int, Court] = {}
    for canton in get_cantons_for_municipality(municipality_id, on):
        for court in get_courts_for_canton(canton['id'], on):
            if court['type'] == type:
                found.setdefault(id(court), court)
    return list(found.values())


# Deprecated: renamed to `find_courts_with_jurisdiction`; it goes in 1.0
find_competent_courts = find_courts_with_jurisdiction


def find_courts_for_postal_code(
    postal_code: str, type: CourtType, on: Day | None = None
) -> list[PostalCodeCourts]:
    """The courts for a postal code on a day (today by default), per municipality. A postal code
    belongs to one municipality for almost every code; 1040, 1050 and 1804 belong to two, and the
    street then decides which, so the answer is one entry per municipality and is never collapsed
    to one. Empty for an unknown postal code. A street address in a city split over cantons still
    needs the cantons' `territory` to pick one."""
    return [
        PostalCodeCourts(
            municipality,
            find_justices_of_the_peace(municipality['id'], on),
            find_courts_with_jurisdiction(municipality['id'], type, on),
        )
        for municipality in get_municipalities_for_postal_code(postal_code, on)
    ]
