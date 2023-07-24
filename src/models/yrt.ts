export interface LinesRequest {
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
