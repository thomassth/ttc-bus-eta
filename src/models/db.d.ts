export type DbStop = {
  stopId: string;
  lon: number;
  lat: number;
  tag: string;
  title: string;
  directions: string;
  lines: string[];
  id: string;
};

export type StopWithDistance = DbStop & {
  realDistance: number;
};
