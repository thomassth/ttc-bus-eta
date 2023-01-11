import { LineStop } from "../../data/EtaObjects";
import { stopsXml } from "../../data/EtaXml";

export function stopsParser(json: stopsXml): LineStop[] {
  const result: LineStop[] = [];
  console.log(json);
  if (json.body.Error === undefined) {
    for (const element of json.body.route.stop) {
      if (element.stopId === undefined) {
        console.log(element);
      } else {
        result.push({
          id: parseInt(element.tag),
          name: element.title,
          latlong: [parseFloat(element.lat), parseFloat(element.lon)],
          stopId: parseInt(element.stopId),
        });
      }
    }
  } else {
    result.push({
      name: "Error",
      id: -1,
      latlong: [],
      stopId: -1,
    });
  }
  console.log(result);
  return result;
}
