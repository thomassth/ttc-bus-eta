import { useEffect, useState } from "react";

import { get } from "../../data/ttcRouteDb.js";

export default function NearbyList() {
  const [value, setValue] = useState<String>("");

  useEffect(() => {
    get("9234").then((result) => {
      console.log(result);
      setValue(result.title);
    });
  }, []);

  return (
    <div>
      The closest bus stops are:
      {value}
    </div>
  );
}
