import { LineStopEta } from "../FetchStop";
import { parseRoute } from "./routeName";

export interface Eta {
  id: number;
  second: number;
  busId: number;
  branch: string;
  tripTag: number;
  epochTime: number;
}

export const etaParser = (json: any) => {
  const result: LineStopEta[] = [];

  if (Object.keys(json).length === 0) {
    return [];
  }

  if (Array.isArray(json.body.predictions) === false) {
    console.log("single lines stop");
    if (json.body.predictions.dirTitleBecauseNoPredictions === undefined) {
      if (Array.isArray(json.body.predictions.direction) === false) {
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
            (element: any, index: number) => {
              result[result.length - 1].etas.push({
                id: index,
                second: element.seconds,
                busId: element.vehicle,
                branch: element.branch,
                tripTag: element.tripTag,
                epochTime: element.epochTime,
              });
              return null;
            }
          );
        } else {
          const predictionGroup = json.body.predictions.direction.prediction;
          result.push({
            line: predictionGroup.routeTag,
            stopName: predictionGroup.stopTitle,
            routeName: parseRoute(predictionGroup.routeTitle),
            etas: [],
            stopTag: parseInt(predictionGroup.stopTag),
          });
        }
      } else {
        // 1 prediction, 2 directions
        // Eg. stops/14761 returns 939A, 939B
        const predictionGroup = json.body.predictions;

        const line = predictionGroup.routeTag;
        const stopName = predictionGroup.stopTitle;
        const stopTag = parseInt(predictionGroup.stopTag);
        predictionGroup.direction.map((element: any) => {
          // Only lines with etas are listed
          if (element.dirTitleBecauseNoPredictions === undefined) {
            result.push({
              line,
              stopName,
              routeName: "",
              etas: [],
              stopTag,
            });
            if (Array.isArray(element.prediction) === false) {
              const item = element.direction.prediction;
              result[result.length - 1].etas.push({
                id: 0,
                second: item.seconds,
                busId: item.vehicle,
                branch: item.branch,
                tripTag: item.tripTag,
                epochTime: item.epochTime,
              });
            } else {
              element.prediction.map((el2: any, index2: number) => {
                result[result.length - 1].etas.push({
                  id: index2,
                  second: el2.seconds,
                  busId: el2.vehicle,
                  branch: el2.branch,
                  tripTag: el2.tripTag,
                  epochTime: el2.epochTime,
                });
                return null;
              });
            }
            return null;
          }
          return null;
        });
        // if no line have ETA, keep a title
        if (result.length === 0) {
          result.push({
            line: "",
            stopName: json.body.predictions[0].stopTitle,
            routeName: "",
            etas: [],
            stopTag: parseInt(json.body.predictions[0].stopTag),
          });
        }
        return result;
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
  } else {
    console.log("multi line stop");
    json.body.predictions.map((element: any) => {
      // Only lines with etas are listed
      if (element.dirTitleBecauseNoPredictions === undefined) {
        if (Array.isArray(element.direction)) {
          const stopName = element.stopTitle;
          const line = element.routeTag;
          const stopTag = parseInt(element.stopTag);
          element.direction.map((el3: any) => {
            result.push({
              line,
              stopName,
              routeName: parseRoute(el3.title),
              etas: [],
              stopTag,
            });
            if (Array.isArray(el3.prediction) === false) {
              console.log("single prediction");
              const item = el3.prediction;
              result[result.length - 1].etas.push({
                id: 0,
                second: item.seconds,
                busId: item.vehicle,
                branch: item.branch,
                tripTag: item.tripTag,
                epochTime: item.epochTime,
              });
            } else {
              el3.prediction.map((el2: any, index2: number) => {
                result[result.length - 1].etas.push({
                  id: index2,
                  second: el2.seconds,
                  busId: el2.vehicle,
                  branch: el2.branch,
                  tripTag: el2.tripTag,
                  epochTime: el2.epochTime,
                });
                return null;
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
          if (Array.isArray(element.direction.prediction) === false) {
            const item = element.direction.prediction;
            result[result.length - 1].etas.push({
              id: 0,
              second: item.seconds,
              busId: item.vehicle,
              branch: item.branch,
              tripTag: item.tripTag,
              epochTime: item.epochTime,
            });
          } else {
            element.direction.prediction.map((el2: any, index2: number) => {
              result[result.length - 1].etas.push({
                id: index2,
                second: el2.seconds,
                busId: el2.vehicle,
                branch: el2.branch,
                tripTag: el2.tripTag,
                epochTime: el2.epochTime,
              });
              return null;
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
  }
  return result;
};
