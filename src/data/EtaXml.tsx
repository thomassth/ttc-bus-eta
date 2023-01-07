// Only store types directly inside parsed XMLs here
export interface EtaBus {
  seconds: number;
  vehicle: number;
  branch: string;
  tripTag: number;
  epochTime: number;
}

export interface EtaXml {
  body: {
    predictions:
    | EtaPredictions[]
    | EtaPredictions;
  };
}

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
