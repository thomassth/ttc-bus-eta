import { XMLParser } from "fast-xml-parser";

import { EtaPredictionXml, RouteXml } from "../../models/etaXml";
import { BranchEta } from "../../models/favouriteEta";
import { LineStop } from "../../models/lineStop";

export const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

export function extractStopDataFromXml(json: RouteXml): LineStop[] {
  if (json.body.Error === undefined) {
    return json.body.route.stop.flatMap((element) => {
      if (element.stopId === undefined) return [];

      return {
        id: parseInt(element.tag),
        name: element.title,
        latlong: [parseFloat(element.lat), parseFloat(element.lon)],
        stopId: parseInt(element.stopId),
      };
    });
  }

  return [];
}

export const extractEtaDataFromXml = (json: EtaPredictionXml): BranchEta[] => {
  const predictions = Array.isArray(json.body.predictions)
    ? json.body.predictions
    : [json.body.predictions];

  return predictions
    .map((prediction) => {
      if (prediction.dirTitleBecauseNoPredictions) {
        return [
          {
            id: "",
            routeTag: prediction.routeTag,
            branchTag: "",
            stopTag: prediction.stopTag,
            stopTitle: prediction.stopTitle,
            routeTitle: "",
            destination: "",
            dirTag: "",
          },
        ];
      }

      const directions = Array.isArray(prediction.direction)
        ? prediction.direction
        : [prediction.direction];

      return directions.map((direction) => {
        const etas = Array.isArray(direction.prediction)
          ? direction.prediction
          : [direction.prediction];

        let branchTag = "";
        let dirTag = "";
        const branchEtas: number[] = etas.map((eta) => {
          branchTag =
            branchTag === "" && eta.branch !== "" ? eta.branch : branchTag;
          dirTag = dirTag === "" && eta.dirTag !== "" ? eta.dirTag : dirTag;
          return eta.minutes;
        });

        // yes I know, dont't judge me...
        const destination =
          direction.title.split("towards").pop()?.trim() ?? "";

        return {
          id: `${dirTag}-${prediction.stopTag}`,
          routeTag: prediction.routeTag,
          branchTag,
          stopTag: prediction.stopTag,
          stopTitle: prediction.stopTitle,
          etas: branchEtas,
          destination,
          routeTitle: direction.title,
        };
      });
    })
    .flat()
    .sort((a, b) => b.branchTag.localeCompare(a.branchTag));
};
