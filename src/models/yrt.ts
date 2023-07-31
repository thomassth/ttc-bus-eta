export interface CountdownItems {
  sec: number;
  LineName: string;
  LineAbbr: string;
}

export interface StopRequest {
  result?: {
    StopTimeResult: {
      Lines: {
        StopId: number;
        StopAbbr: string;
        LineAbbr: string;
        LineName: string;
        DirectionName: string;
        LineDirId: number;
        StopName: string;
      }[];
    }[];
    RealTimeResults: {
      RealTimeSPC: number;
      LineDirId: number;
    }[];
    Validation: {
      Message: string;
      Type: string;
    }[];
  }[];
}

export interface LineItem {
  sortOrder: string;
  lineIdContexts: {
    lineId: number;
  }[];
  colour: string;
  name: string;
}

export interface LinesRequest {
  result?: {
    lines: LineItem[];
    validation: {
      Message: string;
      Type: string;
    }[];
  };
}

export interface YRTStop {
  stopId: number;
  coordinate: {
    lat: number;
    lon: number;
  };
  name: string;
}

export interface LineList {
  lineDirId: string;
  stops: YRTStop[];
}

export interface LineRequest {
  result?: {
    directions: LineList[];
    validation: {
      Message: string;
      Type: string;
    }[];
  };
}
