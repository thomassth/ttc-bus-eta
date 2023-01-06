import { LineStopEta } from "../fetch/FetchStop";
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
    if (json.body.predictions["@_dirTitleBecauseNoPredictions"] === undefined) {
      if (Array.isArray(json.body.predictions.direction) === false) {
        const predictionGroup = json.body.predictions;
        // multiple lines => multiple directions
        result.push({
          line: predictionGroup["@_routeTag"],
          stopName: predictionGroup["@_stopTitle"],
          routeName: parseRoute(predictionGroup["@_routeTitle"]),
          etas: [],
          stopTag: parseInt(predictionGroup["@_stopTag"]),
        });
        if (Array.isArray(json.body.predictions.direction.prediction)) {
          json.body.predictions.direction.prediction.map(
            (element: any, index: number) => {
              result[result.length - 1].etas.push({
                id: index,
                second: element["@_seconds"],
                busId: element["@_vehicle"],
                branch: element["@_branch"],
                tripTag: element["@_tripTag"],
                epochTime: element["@_epochTime"],
              });
              return null;
            }
          );
        } else {
          const predictionGroup = json.body.predictions.direction.prediction;
          result.push({
            line: predictionGroup["@_routeTag"],
            stopName: predictionGroup["@_stopTitle"],
            routeName: parseRoute(predictionGroup["@_routeTitle"]),
            etas: [],
            stopTag: parseInt(predictionGroup["@_stopTag"]),
          });
        }
      } else {
        // 1 prediction, 2 directions
        // Eg. stops/14761 returns 939A, 939B
        const predictionGroup = json.body.predictions;

        const line = predictionGroup["@_routeTag"];
        const stopName = predictionGroup["@_stopTitle"];
        const stopTag = parseInt(predictionGroup["@_stopTag"]);
        predictionGroup.direction.map((element: any) => {
          // Only lines with etas are listed
          if (element["@_dirTitleBecauseNoPredictions"] === undefined) {
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
                second: item["@_seconds"],
                busId: item["@_vehicle"],
                branch: item["@_branch"],
                tripTag: item["@_tripTag"],
                epochTime: item["@_epochTime"],
              });
            } else {
              element.prediction.map((el2: any, index2: number) => {
                result[result.length - 1].etas.push({
                  id: index2,
                  second: el2["@_seconds"],
                  busId: el2["@_vehicle"],
                  branch: el2["@_branch"],
                  tripTag: el2["@_tripTag"],
                  epochTime: el2["@_epochTime"],
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
            stopName: json.body.predictions[0]["@_stopTitle"],
            routeName: "",
            etas: [],
            stopTag: parseInt(json.body.predictions[0]["@_stopTag"]),
          });
        }
        return result;
      }
    } else {
      console.log("no ETA at all");
      result.push({
        line: "No ETAs detected.",
        stopName: json.body.predictions["@_stopTitle"],
        routeName: "",
        etas: [],
        stopTag: parseInt(json.body.predictions["@_stopTag"]),
      });
    }
  } else {
    console.log("multi line stop");
    json.body.predictions.map((element: any) => {
      // Only lines with etas are listed
      if (element["@_dirTitleBecauseNoPredictions"] === undefined) {
        if (Array.isArray(element.direction)) {
          const stopName = element["@_stopTitle"];
          const line = element["@_routeTag"];
          const stopTag = parseInt(element["@_stopTag"]);
          element.direction.map((el3: any) => {
            result.push({
              line,
              stopName,
              routeName: parseRoute(el3["@_title"]),
              etas: [],
              stopTag,
            });
            if (Array.isArray(el3.prediction) === false) {
              console.log("single prediction");
              const item = el3.prediction;
              result[result.length - 1].etas.push({
                id: 0,
                second: item["@_seconds"],
                busId: item["@_vehicle"],
                branch: item["@_branch"],
                tripTag: item["@_tripTag"],
                epochTime: item["@_epochTime"],
              });
            } else {
              el3.prediction.map((el2: any, index2: number) => {
                result[result.length - 1].etas.push({
                  id: index2,
                  second: el2["@_seconds"],
                  busId: el2["@_vehicle"],
                  branch: el2["@_branch"],
                  tripTag: el2["@_tripTag"],
                  epochTime: el2["@_epochTime"],
                });
                return null;
              });
            }

            return null;
          });
        } else {
          result.push({
            line: element["@_routeTag"],
            stopName: element["@_stopTitle"],
            routeName: parseRoute(element["@_routeTitle"]),
            etas: [],
            stopTag: parseInt(element["@_stopTag"]),
          });
          if (Array.isArray(element.direction.prediction) === false) {
            const item = element.direction.prediction;
            result[result.length - 1].etas.push({
              id: 0,
              second: item["@_seconds"],
              busId: item["@_vehicle"],
              branch: item["@_branch"],
              tripTag: item["@_tripTag"],
              epochTime: item["@_epochTime"],
            });
          } else {
            element.direction.prediction.map((el2: any, index2: number) => {
              result[result.length - 1].etas.push({
                id: index2,
                second: el2["@_seconds"],
                busId: el2["@_vehicle"],
                branch: el2["@_branch"],
                tripTag: el2["@_tripTag"],
                epochTime: el2["@_epochTime"],
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
        stopName: json.body.predictions[0]["@_stopTitle"],
        routeName: "",
        etas: [],
        stopTag: parseInt(json.body.predictions[0]["@_stopTag"]),
      });
    }
  }
  return result;
};
