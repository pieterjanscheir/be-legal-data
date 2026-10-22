"""Copies the data and the licences from the repository into the package before a build.

Building from the repository (python/ in a checkout) takes the files from ../; building a wheel
from the sdist finds them already in it.
"""

import shutil
from pathlib import Path
from typing import Any

from hatchling.builders.hooks.plugin.interface import BuildHookInterface


def copy_from_repository(root: Path) -> None:
    repository = root.parent
    if not (repository / 'package.json').exists():
        return
    target = root / 'src' / 'belgica' / 'data'
    target.mkdir(exist_ok=True)
    for stale in target.glob('*.json'):
        stale.unlink()
    for file in (repository / 'data').glob('*.json'):
        shutil.copyfile(file, target / file.name)
    for name in ('LICENSE', 'LICENSE-DATA'):
        shutil.copyfile(repository / name, root / name)


class CustomBuildHook(BuildHookInterface):  # type: ignore[type-arg]
    def initialize(self, version: str, build_data: dict[str, Any]) -> None:
        copy_from_repository(Path(self.root))
