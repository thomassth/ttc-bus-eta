export const etaParser = (json: any) => {
  const result: {
    line: string;
    title: string;
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
          line: json.body.predictions["@_routeTitle"],
          title: json.body.predictions["@_stopTitle"],
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
              title,
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
            title: json.body.predictions[0]["@_stopTitle"],
            etas: [],
          });
        }
        return result;
      }
    } else {
      console.log("no ETA at all");
      result.push({
        line: "No ETAs detected.",
        title: json.body.predictions["@_stopTitle"],
        etas: [],
      });
    }
  } else {
    console.log("multi line stop");
    json.body.predictions.map((element: any, index: number) => {
      // Only lines with etas are listed
      if (element["@_dirTitleBecauseNoPredictions"] === undefined) {
        if (Array.isArray(element.direction) === true) {
          const title = element["@_stopTitle"];
          element.direction.map((el3: any, index3: number) => {
            result.push({
              line: el3["@_title"],
              title,
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
            line: element["@_routeTitle"],
            title: element["@_stopTitle"],
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
        title: json.body.predictions[0]["@_stopTitle"],
        etas: [],
      });
    }
  }
  return result;
};
