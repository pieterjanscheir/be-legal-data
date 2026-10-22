"""Point-in-polygon for the boundary datasets: plain ray casting over GeoJSON multipolygons,
with a bounding box to skip the polygons a point is nowhere near"""

import math
from itertools import pairwise

from .types import MultiPolygon, Position, Ring

# A point within a centimetre of an edge counts as on it (degrees; a metre is about 1e-5)
_ON_EDGE = 1e-7

BoundingBox = tuple[float, float, float, float]


def bounding_box(geometry: MultiPolygon) -> BoundingBox:
    # The holes lie within the exterior ring, so every ring may go in
    positions = [p for polygon in geometry['coordinates'] for ring in polygon for p in ring]
    return (
        min(p[0] for p in positions),
        min(p[1] for p in positions),
        max(p[0] for p in positions),
        max(p[1] for p in positions),
    )


def _on_segment(a: Position, b: Position, lon: float, lat: float) -> bool:
    """Whether a point lies on the segment from a to b, give or take _ON_EDGE"""
    outside = max(
        min(a[0], b[0]) - lon,
        lon - max(a[0], b[0]),
        min(a[1], b[1]) - lat,
        lat - max(a[1], b[1]),
    )
    if outside > _ON_EDGE:
        return False
    cross = (b[0] - a[0]) * (lat - a[1]) - (b[1] - a[1]) * (lon - a[0])
    return abs(cross) <= _ON_EDGE * math.hypot(b[0] - a[0], b[1] - a[1])


def _in_ring(ring: Ring, lon: float, lat: float) -> bool:
    """Even-odd ray casting over a closed ring; a point on the ring counts as inside"""
    inside = False
    for previous, current in pairwise(ring):
        if _on_segment(previous, current, lon, lat):
            return True
        ax, ay = previous
        bx, by = current
        if (ay > lat) != (by > lat) and lon < (bx - ax) * (lat - ay) / (by - ay) + ax:
            inside = not inside
    return inside


def contains(geometry: MultiPolygon, lon: float, lat: float) -> bool:
    return any(
        polygon
        and _in_ring(polygon[0], lon, lat)
        and not any(_in_ring(hole, lon, lat) for hole in polygon[1:])
        for polygon in geometry['coordinates']
    )


def in_box(box: BoundingBox, lon: float, lat: float) -> bool:
    """Whether a point lies within a bounding box, edges included"""
    min_lon, min_lat, max_lon, max_lat = box
    return min_lon <= lon <= max_lon and min_lat <= lat <= max_lat


def require_coordinates(longitude: float, latitude: float) -> None:
    """Raises `ValueError` for coordinates that aren't finite numbers"""
    if not (math.isfinite(longitude) and math.isfinite(latitude)):
        raise ValueError(
            f'Expected a longitude and a latitude in decimal degrees, got {longitude}, {latitude}'
        )
