"""The JSON files shipped in the package, each read once, on first use"""

import json
from functools import cache
from importlib.resources import files
from typing import Any


@cache
def load(name: str) -> Any:
    """A data file by name, e.g. 'courts' for data/courts.json"""
    text = files('belgica').joinpath('data', f'{name}.json').read_text(encoding='utf-8')
    return json.loads(text)
