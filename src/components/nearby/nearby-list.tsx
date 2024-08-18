import { useEffect, useState } from "react";

import { getStopsWithinRange } from "../../store/ttcRouteDb.js";

export default function NearbyList() {
  const [stopsList, setStopsList] = useState<[]>([]);

  useEffect(() => {
    getStopsWithinRange(43.7367799, -79.43401, 0.001).then((result) => {
      setStopsList(result);
    });
  }, []);

  return (
    <div>
      The closest bus stops are:
      {stopsList.map((stop) => (
        <div key={stop.id}>{stop.title}</div>
      ))}
    </div>
  );
}
