import type { EtaBus, EtaBusString } from "../../models/etaJson.js";
import type { LineStopEta } from "../../models/etaObjects.js";

const etaItemGenerator = (item: EtaBus | EtaBusString) => {
  return {
    id: item.tripTag.toString(),
    seconds: item.seconds,
    vehicle: item.vehicle,
    branch: item.branch,
    tripTag: item.tripTag,
    epochTime: item.epochTime,
    minutes: item.minutes,
    isDeparture: item.isDeparture,
    affectedByLayover: item.affectedByLayover,
    dirTag: item.dirTag,
    block: item.block,
  };
};

export const parseSingleOrMultiEta = (
  input: EtaBus[] | EtaBus | EtaBusString[] | EtaBusString,
  result: LineStopEta[]
) => {
  if (Array.isArray(input)) {
    result[result.length - 1].etas = result[result.length - 1].etas?.concat(
      input.map((item) => {
        return etaItemGenerator(item);
      })
    );
  } else {
    const item = input;
    result[result.length - 1].etas = result[result.length - 1].etas?.concat([
      etaItemGenerator(item),
    ]);
  }
  result[result.length - 1].etas?.sort((a, b) => a.seconds - b.seconds);
};
