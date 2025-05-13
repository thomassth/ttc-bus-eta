// Only store types directly inside parsed XMLs here

export interface BasicJson {
  Error?: { ["#text"]: string };
}

export interface EtaBus {
  seconds: number;
  minutes: number;
  isDeparture: boolean;
  affectedByLayover?: boolean;
  vehicle: number;
  dirTag: string;
  block: string;
  branch: string;
  tripTag: number;
  epochTime: number;
}

export interface EtaBusString {
  seconds: string;
  minutes: string;
  isDeparture: string;
  affectedByLayover?: string;
  vehicle: string;
  dirTag: string;
  block: string;
  branch: string;
  tripTag: string;
  epochTime: string;
}

export interface EtaDirection {
  /** @example "West - 939a Finch Express towards Finch Station via Scarborough Ctr Stn" */
  title?: string;
  /** @example "West - 939a Finch Express towards Finch Station via Scarborough Ctr Stn" */
  dirTitleBecauseNoPredictions?: string;
  prediction: EtaBus[] | EtaBus | EtaBusString[] | EtaBusString;
}

export interface EtaPredictions {
  /** @example "West - 939a Finch Express towards Finch Station via Scarborough Ctr Stn" */
  title?: string;
  /** @example "West - 939a Finch Express towards Finch Station via Scarborough Ctr Stn" */
  dirTitleBecauseNoPredictions?: string;
  direction: EtaDirection[] | EtaDirection;
  agencyTitle: string;
  stopTitle: string;
  routeTag: string;
  stopTag: string;
  /** @example "939-Finch Express" */
  routeTitle: string;
}

export type EtaPredictionJson = {
  copyright?: string;
  predictions?: EtaPredictions[] | EtaPredictions;
} & BasicJson;

export interface RouteLineJson {
  title: string;
  name: string;
  branch: number;
  stop: { tag: string }[];
  tag: string;
}

export type RouteJson = {
  route: {
    color: string;
    direction: RouteLineJson[];
    latMax: string;
    lonMax: string;
    lonMin: string;
    oppositeColor: string;
    tag: string;
    title: string;
    path: {
      point: {
        lat: number;
        lon: number;
      }[];
    }[];
    stop: {
      stopId: string;
      tag: string;
      title: string;
      lat: string;
      lon: string;
    }[];
  };
} & BasicJson;

export type RoutesJson = {
  body: {
    route: {
      tag: number;
      title: string;
    }[];
  };
} & BasicJson;
