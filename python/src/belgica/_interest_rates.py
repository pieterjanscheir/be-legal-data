"""The legal interest rate and the rate for commercial transactions"""

from dataclasses import dataclass
from typing import cast

from ._data import load
from ._time import Day, to_day
from .types import InterestRates, InterestType


def interest_rates() -> InterestRates:
    """Both series, every period"""
    return cast(InterestRates, load('interest-rates'))


@dataclass(frozen=True)
class InterestRateResult:
    rate: float
    """Rate in percent"""
    period_from: str
    """First day of the period the rate is set for, YYYY-MM-DD"""
    period_to: str
    """Last day of the period, YYYY-MM-DD"""


def get_interest_rate(
    day: Day, type: InterestType, *, contract_after_20130316: bool = False
) -> InterestRateResult | None:
    """The rate that applies on a day, or None when no rate is on file for it (before the earliest
    period, or a period not yet published).

    Raises `ValueError` for a string that isn't a valid YYYY-MM-DD day.

    `contract_after_20130316` only matters for commercial interest between 2013 and 15 March 2015;
    by default the rate for older contracts is used.
    """
    on = to_day(day)
    period = next(
        (p for p in interest_rates()[type]['periods'] if p['from'] <= on <= p['to']), None
    )
    if period is None:
        return None
    rate = period['rate']
    if not contract_after_20130316 and 'rateForContractsBefore20130316' in period:
        rate = period['rateForContractsBefore20130316']
    return InterestRateResult(rate, period['from'], period['to'])


def get_latest_known_rate_date(type: InterestType) -> str:
    """Last day for which a rate is on file, YYYY-MM-DD"""
    return interest_rates()[type]['periods'][-1]['to']
