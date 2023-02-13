import Papa from "papaparse";
import { useEffect, useState } from "react";

export default function GTFSRoutes() {
  const [test, setTest] = useState<any[]>([]);
  useEffect(() => {
    Papa.parse("data/go/routes.txt", {
      download: true,
      header: true,
      complete: (results) => {
        setTest(results.data);
        // console.log(results);
      },
    });
  }, []);
  console.info(test);
  return (
    <div>
      {test.map((item) => {
        return <GTFSRouteTile item={item} key={item.route_id} />;
      })}
    </div>
  );
}

function GTFSRouteTile(props: any) {
  return (
    <div>
      <h1>{props.item.route_long_name}</h1>
    </div>
  );
}
