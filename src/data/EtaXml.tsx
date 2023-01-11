// Only store types directly inside parsed XMLs here

export interface BasicXml {
  body: {
    Error: { ["#text"]: string } | undefined;
  };
}

export interface EtaPredictionXml {
  body: {
    Error: { ["#text"]: string } | undefined;
    predictions:
    | EtaPredictions[]
    | EtaPredictions;
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

export interface EtaDirection {
  title: string,
  dirTitleBecauseNoPredictions: string | undefined;
  prediction:
  | EtaBus[]
  | EtaBus;
}

export interface EtaBus {
  seconds: number;
  vehicle: number;
  branch: string;
  tripTag: number;
  epochTime: number;
}

export interface RouteXml {
  body: {
    Error: { ["#text"]: string } | undefined;
    route: {
      direction: RouteLineXml[]
    }
  };
}

export interface RouteLineXml {
  title: string;
  name: string;
  branch: number;
  stop: { tag: string }[];
  tag: string;
}

export interface stopsXml {
  body: {
    Error: { ["#text"]: string } | undefined;
    route: {
      stop: {
        stopId: string | undefined;
        tag: string;
        title: string;
        lat: string;
        lon: string;
      }[];
    };
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
