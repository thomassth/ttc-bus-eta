import { EtaBusWithID, LineStopEta } from "../../data/etaObjects";
import { EtaBus } from "../../data/etaXml";

const pushIntoEta = (eta: EtaBusWithID[], item: EtaBus) => {
  return eta.push({
    id: `${item.tripTag}`,
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
  });
};

export const parseSingleOrMultiEta = (
  input: EtaBus | EtaBus[],
  result: LineStopEta[]
) => {
  if (Array.isArray(input)) {
    for (const item of input) {
      pushIntoEta(result[result.length - 1].etas, item);
    }
  } else {
    const item = input;
    pushIntoEta(result[result.length - 1].etas, item);
  }
  result[result.length - 1].etas.sort((a, b) => a.seconds - b.seconds);
};
