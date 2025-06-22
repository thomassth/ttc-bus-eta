import type {
  EtaPredictionJson,
  EtaPredictions,
} from "../../models/etaJson.js";
import type {
  LineStopEta,
  StopBookmark,
  stopBookmarkWithEta,
} from "../../models/etaObjects.js";
import { parseSingleOrMultiEta } from "./etaParserUtils.js";
import { parseRoute } from "./routeName.js";

const parseEtaPredictions = (stop: EtaPredictions, result: LineStopEta[]) => {
  result.push({
    line: parseRoute(stop.routeTitle).prefix || "",
    stopName: stop.stopTitle,
    routeName: parseRoute(stop.routeTitle).name,
    etas: [],
    stopTag: Number.parseInt(stop.stopTag),
    direction: stop.dirTitleBecauseNoPredictions
      ? parseRoute(stop.dirTitleBecauseNoPredictions).prefix
      : parseRoute(
          (Array.isArray(stop.direction)
            ? stop.direction[0].title
            : stop.direction.title) ?? ""
        ).prefix,
  });
  if (stop.dirTitleBecauseNoPredictions === undefined) {
    if (Array.isArray(stop.direction)) {
      for (const direction of stop.direction) {
        parseSingleOrMultiEta(direction.prediction, result);
      }
    } else {
      parseSingleOrMultiEta(stop.direction.prediction, result);
    }
  }
};

export const multiStopParser = (json: EtaPredictionJson) => {
  const result: LineStopEta[] = [];
  if (json.predictions) {
    if (Array.isArray(json.predictions)) {
      for (const stop of json.predictions) {
        parseEtaPredictions(stop, result);
      }
    } else {
      parseEtaPredictions(json.predictions, result);
    }
  }
  return result;
};

export function multiStopUnifier(
  json: EtaPredictionJson,
  stopBookmarks: StopBookmark[]
) {
  const result = multiStopParser(json);

  // phase 2: combine a/c to stop number
  const unifiedList: stopBookmarkWithEta[] = stopBookmarks.map(
    (stopBookmark) => {
      const enabled = stopBookmark.enabled;

      return {
        stopId: stopBookmark.stopId,
        name: stopBookmark.name,
        enabled,
        lines: enabled?.length ? enabled : stopBookmark.lines,
        ttcId: stopBookmark.ttcId,
        etas: [],
        type: stopBookmark.type,
      };
    }
  );

  for (const item of result) {
    const matchingStop = unifiedList.findIndex(
      (searching) => item.stopTag === searching.ttcId
    );
    if (item.direction) {
      unifiedList[matchingStop].direction = item.direction;
    } else if (
      unifiedList[matchingStop].direction?.toLowerCase() !==
      item.direction?.toLowerCase()
    ) {
      unifiedList[matchingStop].direction = "multiple";
    }
    unifiedList[matchingStop].etas = unifiedList[matchingStop].etas
      .concat(item.etas)
      .sort((a, b) => a.epochTime - b.epochTime);
  }
  return unifiedList;
}
