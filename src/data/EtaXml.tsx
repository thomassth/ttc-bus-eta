// Only store types directly inside parsed XMLs here
export interface EtaBus {
  seconds: number;
  vehicle: number;
  branch: string;
  tripTag: number;
  epochTime: number;
}

export interface BasicXml {
  body: {
    Error: string | undefined;
  };
}

export interface EtaPredictionXml {
  body: {
    Error: string | undefined;
    predictions:
    | EtaPredictions[]
    | EtaPredictions;
  };
}

export interface RouteXml {
  body: {
    Error: { ["#text"]: string } | undefined;
    route: {
      direction: {
        title: string;
        name: string;
        branch: number;
        stop: { tag: string }[];
      }[]
    }
  };
}

export interface RouteStopXml {
  body: {
    Error: { ["#text"]: string } | undefined;
    predictions: {
      dirTitleBecauseNoPredictions: string | undefined;
      stopTitle: string;
      direction: EtaDirection | EtaDirection[]
    }
  };
};

export interface EtaDirection {
  title: string,
  dirTitleBecauseNoPredictions: string | undefined;
  prediction:
  | EtaBus[]
  | EtaBus;
  direction: {
    prediction:
    | EtaBus[]
    | EtaBus;
  };
}

export interface EtaPredictions {
  dirTitleBecauseNoPredictions: string | undefined;
  direction:
  | EtaDirection[]
  | EtaDirection;
  stopTitle: string;
  routeTag: string;
  stopTag: string;
  routeTitle: string;
}
