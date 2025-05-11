import type { EtaDirection, EtaPredictionJson } from "../../models/etaJson.js";
import type { LineStopEta } from "../../models/etaObjects.js";
import { parseSingleOrMultiEta } from "./etaParserUtils.js";
import { parseRoute } from "./routeName.js";

const parseActualLineNum = (title: string) => {
  const found = title.match(/(\w+) - (\w+) ([\w\s]+)/);
  if (found === null) {
    return "";
  }
  return found[2].toLocaleUpperCase();
};

export const etaParser = (json: EtaPredictionJson) => {
  let result: LineStopEta[] = [];

  if (Object.keys(json).length === 0) {
    return [];
  }

  if (Array.isArray(json.predictions)) {
    for (const prediction of json.predictions) {
      // Only lines with etas are listed
      if (prediction.dirTitleBecauseNoPredictions === undefined) {
        if (Array.isArray(prediction.direction)) {
          const stopName = prediction.stopTitle;
          const stopTag = Number.parseInt(prediction.stopTag);

          for (const directionPredictions of prediction.direction) {
            const title =
              directionPredictions.title ||
              directionPredictions.dirTitleBecauseNoPredictions ||
              "";

            result.push({
              line: parseActualLineNum(title),
              stopName,
              routeName: parseRoute(title).name,
              etas: [],
              stopTag,
              direction: parseRoute(title).prefix,
            });
            parseSingleOrMultiEta(directionPredictions.prediction, result);
          }
        } else {
          const title =
            prediction.direction.title ||
            prediction.direction.dirTitleBecauseNoPredictions ||
            "";

          result.push({
            line: parseActualLineNum(title),
            stopName: prediction.stopTitle,
            routeName: parseRoute(prediction.routeTitle).name,
            etas: [],
            stopTag: Number.parseInt(prediction.stopTag),
            direction: parseRoute(title).prefix,
          });
          parseSingleOrMultiEta(prediction.direction.prediction, result);
        }
      } else {
        result.push({
          line: parseActualLineNum(prediction.dirTitleBecauseNoPredictions),
          stopName: prediction.stopTitle,
          routeName: parseRoute(prediction.routeTitle).name,
          etas: [],
          stopTag: Number.parseInt(prediction.stopTag),
          direction: parseRoute(prediction.dirTitleBecauseNoPredictions).prefix,
        });
      }
    }
    // if no line have ETA, keep a title
    if (result.length === 0) {
      result = [
        {
          line: "",
          stopName: json.predictions[0].stopTitle,
          routeName: "",
          etas: [],
          stopTag: Number.parseInt(json.predictions[0].stopTag),
        },
      ];
    }
  } else {
    if (json.predictions?.dirTitleBecauseNoPredictions === undefined) {
      if (Array.isArray(json.predictions?.direction)) {
        // 1 prediction, 2 directions
        // Eg. stops/14761 returns 939A, 939B
        const predictionGroup = json.predictions;

        // const line = predictionGroup.direction.title;
        const stopName = predictionGroup.stopTitle;
        const stopTag = Number.parseInt(predictionGroup.stopTag);
        if (Array.isArray(predictionGroup.direction)) {
          for (const element of predictionGroup.direction) {
            // Only lines with etas are listed
            if (element.dirTitleBecauseNoPredictions === undefined) {
              const title =
                element.title || element.dirTitleBecauseNoPredictions || "";

              result.push({
                line: parseActualLineNum(title),
                stopName,
                routeName: "",
                etas: [],
                stopTag,
                direction: parseRoute(title).prefix,
              });
              parseSingleOrMultiEta(element.prediction, result);
            } else {
              result.push({
                line: parseActualLineNum(element.dirTitleBecauseNoPredictions),
                stopName,
                routeName: "",
                etas: [],
                stopTag,
                direction: parseRoute(element.dirTitleBecauseNoPredictions)
                  .prefix,
              });
            }
          }
        }

        // if no line have ETA, keep a title
        if (result.length === 0 && Array.isArray(json.predictions)) {
          result = [
            {
              line: "",
              stopName: json.predictions[0].stopTitle,
              routeName: "",
              etas: [],
              stopTag: Number.parseInt(json.predictions[0].stopTag),
            },
          ];
        }
        return result;
      }
      const predictionGroup = json.predictions;
      // multiple lines => multiple directions

      const getLine = (input: EtaDirection | EtaDirection[]) => {
        if (Array.isArray(input)) {
          return parseActualLineNum(
            input[0].title || input[0].dirTitleBecauseNoPredictions || ""
          );
        }
        return parseActualLineNum(
          input.title || input.dirTitleBecauseNoPredictions || ""
        );
      };
      if (predictionGroup) {
        result.push({
          line: getLine(predictionGroup.direction),
          stopName: predictionGroup.stopTitle,
          routeName: parseRoute(predictionGroup.routeTitle).name,
          etas: [],
          stopTag: Number.parseInt(predictionGroup.stopTag),
          direction: parseRoute(
            Array.isArray(predictionGroup.direction)
              ? predictionGroup.routeTitle
              : predictionGroup.direction.title ?? ""
          ).prefix,
        });
      }
      if (json.predictions?.direction.prediction) {
        parseSingleOrMultiEta(json.predictions.direction.prediction, result);
      }
    } else {
      result.push({
        line: parseActualLineNum(json.predictions.dirTitleBecauseNoPredictions),
        stopName: json.predictions.stopTitle,
        routeName: "",
        etas: [],
        stopTag: Number.parseInt(json.predictions.stopTag),
        direction: parseRoute(json.predictions.dirTitleBecauseNoPredictions)
          .prefix,
      });
    }
  }
  return result;
};
