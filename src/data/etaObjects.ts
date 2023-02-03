import { EtaBus } from "./etaXml";

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

export interface StopBookmark {
  stopId: number;
  name: string;
  ttcId: number;
  lines: string[];
}

export interface EtaBusWithID extends EtaBus {
  id: string;
}

export interface stopBookmarksRedux {
  ids: number[];
  entities: StopBookmark[];
}

export interface settingsItem {
  id: string;
  name: string;
  value: string;
}

export interface settingsRedux {
  ids: string[];
  entities: settingsItem[];
}

export interface stopBookmarkWithEta extends StopBookmark {
  etas: EtaBusWithID[];
}
