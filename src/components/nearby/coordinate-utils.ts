export interface Coordinate {
  lat: number;
  lon: number;
}

export const distanceOfTwoCoordinates = (
  origin: Coordinate,
  dest: Coordinate
) => {
  return Math.sqrt(
    ((dest.lat - origin.lat) * 111.32 * 1000) ** 2 +
      (((dest.lon - origin.lon) * 40075 * 1000 * Math.cos(origin.lon)) / 360) **
        2
  );
};
