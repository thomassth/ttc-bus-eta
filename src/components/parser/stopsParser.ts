import type { RouteJson } from "../../models/etaJson.js";
import type { LineStop } from "../../models/etaObjects.js";

export function stopsParser(json: RouteJson): LineStop[] {
  const result: LineStop[] = [];
  if (json.Error === undefined) {
    for (const element of json.route.stop) {
      if (element.stopId) {
        result.push({
          id: Number.parseInt(element.tag),
          name: element.title,
          latlong: [
            Number.parseFloat(element.lat),
            Number.parseFloat(element.lon),
          ],
          stopId: Number.parseInt(element.stopId),
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
