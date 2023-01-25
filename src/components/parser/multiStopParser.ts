import { LineStopEta } from "../../data/etaObjects";
import { EtaPredictionXml } from "../../data/etaXml";
import { parseSingleOrMultiEta } from "./etaParserUtils";
import { parseRoute } from "./routeName";

const parseActualLineNum = (title: string) => {
  const found = title.match(/(\w+)-/);
  if (found === null) {
    return "";
  } else return `${found[1]}`.toLocaleUpperCase();
};

export const multiStopParser = (json: EtaPredictionXml) => {
  const result: LineStopEta[] = [];

  if (Array.isArray(json.body.predictions)) {
    console.log("multi stops");
    for (const stop of json.body.predictions) {
      result.push({
        line: parseActualLineNum(stop.routeTitle),
        stopName: stop.stopTitle,
        routeName: parseRoute(stop.routeTitle),
        etas: [],
        stopTag: parseInt(stop.stopTag),
      });
      if (Array.isArray(stop.direction)) {
        for (const direction of stop.direction) {
          parseSingleOrMultiEta(direction.prediction, result);
        }
      } else {
        parseSingleOrMultiEta(stop.direction.prediction, result);
      }
    }
  } else {
    console.log("single stop");
  }
  console.log(result);
  return result;
};
