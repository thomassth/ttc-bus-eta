import { EtaBusWithID, LineStopEta } from "../../data/EtaObjects";
import { EtaBus, EtaPredictionXml } from "../../data/EtaXml";
import { parseRoute } from "./routeName";

const pushIntoEta = (eta: EtaBusWithID[], item: EtaBus) => {
  return eta.push({
    id: `${item.tripTag}`,
    seconds: item.seconds,
    vehicle: item.vehicle,
    branch: item.branch,
    tripTag: item.tripTag,
    epochTime: item.epochTime,
  });
};

const parseSingleOrMultiEta = (
  input: EtaBus | EtaBus[],
  result: LineStopEta[]
) => {
  if (Array.isArray(input)) {
    for (const item of input) {
      pushIntoEta(result[result.length - 1].etas, item);
    }
  } else {
    console.log("single prediction");
    const item = input;
    pushIntoEta(result[result.length - 1].etas, item);
  }
};

export const etaParser = (json: EtaPredictionXml) => {
  console.log(typeof json);
  const result: LineStopEta[] = [];

  if (Object.keys(json).length === 0) {
    return [];
  }

  if (Array.isArray(json.body.predictions)) {
    console.log("multi line stop");

    for (const element of json.body.predictions) {
      // Only lines with etas are listed
      if (element.dirTitleBecauseNoPredictions === undefined) {
        if (Array.isArray(element.direction)) {
          const stopName = element.stopTitle;
          const line = element.routeTag;
          const stopTag = parseInt(element.stopTag);

          for (const el3 of element.direction) {
            result.push({
              line,
              stopName,
              routeName: parseRoute(el3.title),
              etas: [],
              stopTag,
            });
            parseSingleOrMultiEta(el3.prediction, result);
          }
        } else {
          result.push({
            line: element.routeTag,
            stopName: element.stopTitle,
            routeName: parseRoute(element.routeTitle),
            etas: [],
            stopTag: parseInt(element.stopTag),
          });
          parseSingleOrMultiEta(element.direction.prediction, result);
        }
      }
    }
    // if no line have ETA, keep a title
    if (result.length === 0) {
      console.log("empty db");
      result.push({
        line: "",
        stopName: json.body.predictions[0].stopTitle,
        routeName: "",
        etas: [],
        stopTag: parseInt(json.body.predictions[0].stopTag),
      });
    }
  } else {
    console.log("single lines stop");
    if (json.body.predictions.dirTitleBecauseNoPredictions === undefined) {
      if (Array.isArray(json.body.predictions.direction)) {
        // 1 prediction, 2 directions
        // Eg. stops/14761 returns 939A, 939B
        const predictionGroup = json.body.predictions;

        const line = predictionGroup.routeTag;
        const stopName = predictionGroup.stopTitle;
        const stopTag = parseInt(predictionGroup.stopTag);
        if (Array.isArray(predictionGroup.direction)) {
          for (const element of predictionGroup.direction) {
            // Only lines with etas are listed
            if (element.dirTitleBecauseNoPredictions === undefined) {
              result.push({
                line,
                stopName,
                routeName: "",
                etas: [],
                stopTag,
              });
              parseSingleOrMultiEta(element.prediction, result);
            }
          }
        }

        // if no line have ETA, keep a title
        if (result.length === 0 && Array.isArray(json.body.predictions)) {
          result.push({
            line: "",
            stopName: json.body.predictions[0].stopTitle,
            routeName: "",
            etas: [],
            stopTag: parseInt(json.body.predictions[0].stopTag),
          });
        }
        return result;
      } else {
        const predictionGroup = json.body.predictions;
        // multiple lines => multiple directions
        result.push({
          line: predictionGroup.routeTag,
          stopName: predictionGroup.stopTitle,
          routeName: parseRoute(predictionGroup.routeTitle),
          etas: [],
          stopTag: parseInt(predictionGroup.stopTag),
        });
        parseSingleOrMultiEta(
          json.body.predictions.direction.prediction,
          result
        );
      }
    } else {
      console.log("no ETA at all");
      result.push({
        line: "",
        stopName: json.body.predictions.stopTitle,
        routeName: "",
        etas: [],
        stopTag: parseInt(json.body.predictions.stopTag),
      });
    }
  }
  return result;
};
