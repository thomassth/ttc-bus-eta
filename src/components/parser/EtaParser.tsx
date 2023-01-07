import { LineStopEta } from "../../data/EtaObjects";
import {
  EtaBus,
  EtaDirection,
  EtaPredictionXml,
  EtaPredictions,
} from "../../data/EtaXml";
import { parseRoute } from "./routeName";

export const etaParser = (json: EtaPredictionXml) => {
  console.log(typeof json);
  const result: LineStopEta[] = [];

  if (Object.keys(json).length === 0) {
    return [];
  }

  if (Array.isArray(json.body.predictions)) {
    console.log("multi line stop");
    json.body.predictions.map((element: EtaPredictions) => {
      // Only lines with etas are listed
      if (element.dirTitleBecauseNoPredictions === undefined) {
        if (Array.isArray(element.direction)) {
          const stopName = element.stopTitle;
          const line = element.routeTag;
          const stopTag = parseInt(element.stopTag);
          element.direction.map((el3: EtaDirection) => {
            result.push({
              line,
              stopName,
              routeName: parseRoute(el3.title),
              etas: [],
              stopTag,
            });

            if (Array.isArray(el3.prediction)) {
              el3.prediction.map((el2: EtaBus, index2: number) => {
                result[result.length - 1].etas.push({
                  id: index2,
                  seconds: el2.seconds,
                  vehicle: el2.vehicle,
                  branch: el2.branch,
                  tripTag: el2.tripTag,
                  epochTime: el2.epochTime,
                });
                return null;
              });
            } else {
              console.log("single prediction");
              const item = el3.prediction;
              result[result.length - 1].etas.push({
                id: 0,
                seconds: item.seconds,
                vehicle: item.vehicle,
                branch: item.branch,
                tripTag: item.tripTag,
                epochTime: item.epochTime,
              });
            }
            return null;
          });
        } else {
          result.push({
            line: element.routeTag,
            stopName: element.stopTitle,
            routeName: parseRoute(element.routeTitle),
            etas: [],
            stopTag: parseInt(element.stopTag),
          });

          if (Array.isArray(element.direction.prediction)) {
            element.direction.prediction.map((el2: EtaBus, index2: number) => {
              result[result.length - 1].etas.push({
                id: index2,
                seconds: el2.seconds,
                vehicle: el2.vehicle,
                branch: el2.branch,
                tripTag: el2.tripTag,
                epochTime: el2.epochTime,
              });
              return null;
            });
          } else {
            const item = element.direction.prediction;
            result[result.length - 1].etas.push({
              id: 0,
              seconds: item.seconds,
              vehicle: item.vehicle,
              branch: item.branch,
              tripTag: item.tripTag,
              epochTime: item.epochTime,
            });
          }
        }
        return null;
      }
      return null;
    });
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
          predictionGroup.direction.map((element: EtaDirection) => {
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
                element.prediction.map((el2: EtaBus, index2: number) => {
                  result[result.length - 1].etas.push({
                    id: index2,
                    seconds: el2.seconds,
                    vehicle: el2.vehicle,
                    branch: el2.branch,
                    tripTag: el2.tripTag,
                    epochTime: el2.epochTime,
                  });
                  return null;
                });
              } else {
                const item = element.direction.prediction;
                if (Array.isArray(item)) {
                  // TODO: finish this next reorg
                  console.log("Not done yet :(");
                } else {
                  result[result.length - 1].etas.push({
                    id: 0,
                    seconds: item.seconds,
                    vehicle: item.vehicle,
                    branch: item.branch,
                    tripTag: item.tripTag,
                    epochTime: item.epochTime,
                  });
                }
              }
              return null;
            }
            return null;
          });
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
          json.body.predictions.direction.prediction.map(
            (element: EtaBus, index: number) => {
              result[result.length - 1].etas.push({
                id: index,
                seconds: element.seconds,
                vehicle: element.vehicle,
                branch: element.branch,
                tripTag: element.tripTag,
                epochTime: element.epochTime,
              });
              return null;
            }
          );
        } else {
          const predictionGroup2 = json.body.predictions;
          result.push({
            line: predictionGroup2.routeTag,
            stopName: predictionGroup2.stopTitle,
            routeName: parseRoute(predictionGroup2.routeTitle),
            etas: [],
            stopTag: parseInt(predictionGroup2.stopTag),
          });
        }
      }
    } else {
      console.log("no ETA at all");
      result.push({
        line: "No ETAs detected.",
        stopName: json.body.predictions.stopTitle,
        routeName: "",
        etas: [],
        stopTag: parseInt(json.body.predictions.stopTag),
      });
    }
  }
  return result;
};
