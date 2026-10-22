"""Contacts: phone numbers, emails and bank accounts of courts, prisons and houses of justice"""

import re
from collections.abc import Mapping, Sequence
from typing import Any

from .types import ContactType

_E164 = re.compile(r'^\+32(\d{8,9})$')


def get_contact(
    record: Mapping[str, Any], type: ContactType, label: str | None = None
) -> str | None:
    """The value of a record's first contact of a type, optionally with a label"""
    contacts: Sequence[Mapping[str, str]] = record['contacts']
    return next(
        (
            contact['value']
            for contact in contacts
            if contact['type'] == type and (label is None or contact.get('label') == label)
        ),
        None,
    )


def format_phone_number(e164: str) -> str:
    """A Belgian phone number in its national written form: '+3292343210' → '09 234 32 10',
    '+3253820701' → '053 82 07 01', '+32470123456' → '0470 12 34 56'. Zones 2, 3, 4 and 9 have a
    one-digit area code; other landlines two digits; mobile numbers start with 4 and are one digit
    longer."""
    match = _E164.match(e164)
    if not match:
        raise ValueError(f"Expected a Belgian number in E.164 form, got '{e164}'")
    n = f'0{match[1]}'
    if len(n) == 10:
        return f'{n[:4]} {n[4:6]} {n[6:8]} {n[8:]}'
    if n[1] in '2349':
        return f'{n[:2]} {n[2:5]} {n[5:7]} {n[7:]}'
    return f'{n[:3]} {n[3:5]} {n[5:7]} {n[7:]}'


def format_iban(iban: str) -> str:
    """An IBAN in groups of four, as printed: 'BE73679200844560' → 'BE73 6792 0084 4560'"""
    return ' '.join(iban[i : i + 4] for i in range(0, len(iban), 4))
