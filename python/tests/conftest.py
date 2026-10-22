import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent

# The data as it is in the repository now, not as it was when the package was installed
sys.path.insert(0, str(ROOT))
from hatch_build import copy_from_repository  # noqa: E402

copy_from_repository(ROOT)
