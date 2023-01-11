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

            if (Array.isArray(el3.prediction)) {
              for (const el2 of el3.prediction) {
                pushIntoEta(result[result.length - 1].etas, el2);
              }
            } else {
              console.log("single prediction");
              const item = el3.prediction;
              pushIntoEta(result[result.length - 1].etas, item);
            }
          }
        } else {
          result.push({
            line: element.routeTag,
            stopName: element.stopTitle,
            routeName: parseRoute(element.routeTitle),
            etas: [],
            stopTag: parseInt(element.stopTag),
          });

          if (Array.isArray(element.direction.prediction)) {
            for (const el2 of element.direction.prediction) {
              pushIntoEta(result[result.length - 1].etas, el2);
            }
          } else {
            const item = element.direction.prediction;
            pushIntoEta(result[result.length - 1].etas, item);
          }
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

              if (Array.isArray(element.prediction)) {
                for (const el2 of element.prediction) {
                  pushIntoEta(result[result.length - 1].etas, el2);
                }
              } else {
                const item = element.direction.prediction;
                if (Array.isArray(item)) {
                  // TODO: finish this next reorg
                  console.log("Not done yet :(");
                } else {
                  pushIntoEta(result[result.length - 1].etas, item);
                }
              }
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
        if (Array.isArray(json.body.predictions.direction.prediction)) {
          for (const element of json.body.predictions.direction.prediction) {
            pushIntoEta(result[result.length - 1].etas, element);
          }
        } else {
          const predictionGroup2 = json.body.predictions;
          result.push({
            line: predictionGroup2.routeTag,
            stopName: predictionGroup2.stopTitle,
            routeName: parseRoute(predictionGroup2.routeTitle),
            etas: [],
            stopTag: parseInt(predictionGroup2.stopTag),
          });
          const item = json.body.predictions.direction.prediction;

          console.log("single prediction");
          pushIntoEta(result[result.length - 1].etas, item);
        }
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
