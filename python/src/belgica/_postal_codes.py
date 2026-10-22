"""Postal codes and the municipalities they belong to"""

from functools import cache

from ._data import load
from ._territory import municipalities
from ._time import Day, applying_on, pick_version, versions_by, versions_by_id
from .types import Municipality, PostalCode

POSTAL_CODES_COVERAGE_FROM = '2025-01-01'
"""The postal codes describe the situation from this day on: Statbel's conversion table as valid
from 1 January 2025, after the municipal mergers. Lookups for an earlier day raise a
`ValueError`."""

_DATASET = 'postal codes'


@cache
def postal_codes() -> tuple[PostalCode, ...]:
    """Every record, every version"""
    return tuple(load('postal-codes'))


@cache
def _indexes() -> tuple[
    dict[str, list[PostalCode]],
    dict[str, list[PostalCode]],
    dict[str, list[PostalCode]],
    dict[str, list[Municipality]],
]:
    return (
        versions_by_id(postal_codes()),
        versions_by(postal_codes(), lambda record: record['postalCode']),
        versions_by(postal_codes(), lambda record: record['municipality']),
        versions_by_id(municipalities()),
    )


def get_postal_code(id: str, on: Day | None = None) -> PostalCode | None:
    """A postal code record by id, e.g. '9000-44021': today's version, or the one of a given
    day"""
    return pick_version(_indexes()[0].get(id), on, POSTAL_CODES_COVERAGE_FROM, _DATASET)


def get_municipalities_for_postal_code(
    postal_code: str, on: Day | None = None
) -> list[Municipality]:
    """The municipalities a postal code belongs to on a day (today by default): one for almost
    every code; two for 1040, 1050 and 1804, where the street decides. Empty for an unknown
    code."""
    found = []
    for record in applying_on(
        _indexes()[1].get(postal_code, []), on, POSTAL_CODES_COVERAGE_FROM, _DATASET
    ):
        # Every record links to a municipality of the same day (tests/test_data.py)
        municipality = pick_version(
            _indexes()[3].get(record['municipality']), on, POSTAL_CODES_COVERAGE_FROM, _DATASET
        )
        if municipality:
            found.append(municipality)
    return found


def get_postal_codes(municipality_id: str, on: Day | None = None) -> list[PostalCode]:
    """The postal codes of a municipality on a day (today by default), by REFNIS code, in order.
    Empty for an unknown code."""
    return sorted(
        applying_on(
            _indexes()[2].get(municipality_id, []), on, POSTAL_CODES_COVERAGE_FROM, _DATASET
        ),
        key=lambda record: record['postalCode'],
    )
