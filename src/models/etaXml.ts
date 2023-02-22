// Only store types directly inside parsed XMLs here

export interface BasicXml {
  body: {
    Error: { ["#text"]: string } | undefined;
  };
}

export interface EtaBus {
  seconds: number;
  minutes: number;
  isDeparture: boolean;
  affectedByLayover: boolean;
  vehicle: number;
  dirTag: string;
  block: string;
  branch: string;
  tripTag: number;
  epochTime: number;
}

export interface EtaBusWithID extends EtaBus {
  id: string;
}

export interface EtaDirection {
  title: string;
  dirTitleBecauseNoPredictions: string | undefined;
  prediction: EtaBus[] | EtaBus;
}

export interface EtaPredictions {
  dirTitleBecauseNoPredictions: string | undefined;
  direction: EtaDirection[] | EtaDirection;
  agencyTitle: string;
  stopTitle: string;
  routeTag: string;
  stopTag: string;
  routeTitle: string;
}

export type EtaPredictionXml = {
  body: {
    predictions: EtaPredictions[] | EtaPredictions;
  };
} & BasicXml;

export interface RouteLineXml {
  title: string;
  name: string;
  branch: number;
  stop: { tag: string }[];
  tag: string;
}

export type RouteXml = {
  body: {
    route: {
      color: string;
      direction: RouteLineXml[];
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
        stopId: string | undefined;
        tag: string;
        title: string;
        lat: string;
        lon: string;
      }[];
    };
  };
} & BasicXml;

export type RoutesXml = {
  body: {
    route: {
      tag: number;
      title: string;
    }[];
  };
} & BasicXml;
