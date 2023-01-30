import { LineStopEta } from "../../data/etaObjects";
import { EtaPredictionXml, EtaPredictions } from "../../data/etaXml";
import { parseSingleOrMultiEta } from "./etaParserUtils";
import { parseRoute } from "./routeName";

const parseActualLineNum = (title: string) => {
  const found = title.match(/(\w+)-([\w\s]+)/);
  if (found === null) {
    return "";
  } else return `${found[1]}`.toLocaleUpperCase();
};

const parseEtaPredictions = (stop: EtaPredictions, result: LineStopEta[]) => {
  result.push({
    line: parseActualLineNum(stop.routeTitle),
    stopName: stop.stopTitle,
    routeName: parseRoute(stop.routeTitle),
    etas: [],
    stopTag: parseInt(stop.stopTag),
  });
  if (stop.dirTitleBecauseNoPredictions === undefined) {
    if (Array.isArray(stop.direction)) {
      for (const direction of stop.direction) {
        parseSingleOrMultiEta(direction.prediction, result);
      }
    } else {
      console.log(stop.direction.prediction);
      parseSingleOrMultiEta(stop.direction.prediction, result);
    }
  }
};

export const multiStopParser = (json: EtaPredictionXml) => {
  const result: LineStopEta[] = [];
  console.log(json);

  if (Array.isArray(json.body.predictions)) {
    console.log("multi stops");
    for (const stop of json.body.predictions) {
      parseEtaPredictions(stop, result);
    }
  } else {
    const stop = json.body.predictions;
    parseEtaPredictions(stop, result);
    console.log("single stop");
  }
  console.log(result);
  return result;
};
