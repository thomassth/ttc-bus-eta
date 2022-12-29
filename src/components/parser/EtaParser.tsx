import { parseRoute } from "./routeName";

export const etaParser = (json: any) => {
  const result: {
    line: string;
    stopName: string;
    routeName: string;
    etas: { id: number; second: any; busId: any; branch: String }[];
  }[] = [];

  if (Object.keys(json).length === 0) {
    return [];
  }

  if (Array.isArray(json.body.predictions) === false) {
    console.log("single lines stop");
    if (json.body.predictions["@_dirTitleBecauseNoPredictions"] === undefined) {
      if (Array.isArray(json.body.predictions.direction) === false) {
        // multiple lines => multiple directions
        result.push({
          line: json.body.predictions["@_routeTag"],
          stopName: json.body.predictions["@_stopTitle"],
          routeName: parseRoute(json.body.predictions["@_routeTitle"]),
          etas: [],
        });
        json.body.predictions.direction.prediction.map(
          (element: any, index: number) => {
            result[result.length - 1].etas.push({
              id: index,
              second: element["@_seconds"],
              busId: element["@_vehicle"],
              branch: element["@_branch"],
            });
            return null;
          }
        );
      } else {
        // 1 prediction, 2 directions
        // Eg. stops/14761 returns 939A, 939B
        const line = json.body.predictions["@_routeTag"];
        const title = json.body.predictions["@_stopTitle"];
        json.body.predictions.direction.map((element: any, index: number) => {
          // Only lines with etas are listed
          if (element["@_dirTitleBecauseNoPredictions"] === undefined) {
            result.push({
              line,
              stopName: title,
              routeName: "",
              etas: [],
            });
            if (Array.isArray(element.prediction) === false) {
              result[result.length - 1].etas.push({
                id: 0,
                second: element.direction.prediction["@_seconds"],
                busId: element.direction.prediction["@_vehicle"],
                branch: element.direction.prediction["@_branch"],
              });
            } else {
              element.prediction.map((el2: any, index2: number) => {
                result[result.length - 1].etas.push({
                  id: index2,
                  second: el2["@_seconds"],
                  busId: el2["@_vehicle"],
                  branch: el2["@_branch"],
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
            line: "No ETAs detected.",
            stopName: json.body.predictions[0]["@_stopTitle"],
            routeName: "",
            etas: [],
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
      });
    }
  } else {
    console.log("multi line stop");
    json.body.predictions.map((element: any, index: number) => {
      // Only lines with etas are listed
      if (element["@_dirTitleBecauseNoPredictions"] === undefined) {
        if (Array.isArray(element.direction)) {
          const title = element["@_stopTitle"];
          const line = element["@_routeTag"];
          element.direction.map((el3: any, index3: number) => {
            result.push({
              line,
              stopName: title,
              routeName: parseRoute(el3["@_title"]),
              etas: [],
            });
            if (Array.isArray(el3.prediction) === false) {
              console.log("single prediction");
              result[result.length - 1].etas.push({
                id: 0,
                second: el3.prediction["@_seconds"],
                busId: el3.prediction["@_vehicle"],
                branch: el3.prediction["@_branch"],
              });
            } else {
              el3.prediction.map((el2: any, index2: number) => {
                result[result.length - 1].etas.push({
                  id: index2,
                  second: el2["@_seconds"],
                  busId: el2["@_vehicle"],
                  branch: el2["@_branch"],
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
          });
          if (Array.isArray(element.direction.prediction) === false) {
            result[result.length - 1].etas.push({
              id: 0,
              second: element.direction.prediction["@_seconds"],
              busId: element.direction.prediction["@_vehicle"],
              branch: element.direction.prediction["@_branch"],
            });
          } else {
            element.direction.prediction.map((el2: any, index2: number) => {
              result[result.length - 1].etas.push({
                id: index2,
                second: el2["@_seconds"],
                busId: el2["@_vehicle"],
                branch: el2["@_branch"],
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
        line: "No ETAs detected.",
        stopName: json.body.predictions[0]["@_stopTitle"],
        routeName: "",
        etas: [],
      });
    }
  }
  return result;
};
