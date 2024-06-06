import { RouteJson } from "../../models/etaJson.js";
import { LineStop } from "../../models/etaObjects.js";

export function stopsParser(json: RouteJson): LineStop[] {
  const result: LineStop[] = [];
  if (json.Error === undefined) {
    for (const element of json.route.stop) {
      if (element.stopId) {
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
  return result;
}
