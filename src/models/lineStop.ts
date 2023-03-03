import { EtaBusWithID } from "./etaXml";

export interface LineStopElement {
  id: JSX.Element;
  name: string;
  latlong: JSX.Element;
  stopId: JSX.Element;
  key: number;
}

export interface LineStopEta {
  line: string;
  stopName: string;
  routeName: string;
  etas: EtaBusWithID[];
  stopTag: number;
}

export interface LineStop {
  id: number;
  name: string;
  latlong: number[];
  stopId: number;
}

export interface StopAccordionsParams {
  result: LineStopElement[];
  title: string;
  direction: string;
  lineNum: number;
  tag: string;
}
