import { useEffect, useState } from "react";

import { addStop, getStopsWithinRange } from "../../store/ttcRouteDb.js";

export default function NearbyList() {
  const [stopsList, setStopsList] = useState<[]>([]);

  useEffect(() => {
    addStop({
      id: "9234",
      lon: parseFloat("-79.43401"),
      lat: parseFloat("43.7367799"),
      title: "Bathurst St At Wilson Ave South Side",
    });

    getStopsWithinRange(43.7367799, -79.43401, 0.01).then((result) => {
      setStopsList(result);
    })
  }, []);

  return (
    <div>
      The closest bus stops are:
      {stopsList.map((stop) => (
        <div key={stop.id}>
          {stop.title}
        </div>
      ))}
    </div>
  );
}
