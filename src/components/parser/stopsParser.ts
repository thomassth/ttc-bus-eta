import { LineStop } from "../../data/etaObjects";
import { RouteXml } from "../../data/etaXml";

export function stopsParser(json: RouteXml): LineStop[] {
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
