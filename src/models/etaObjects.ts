import { EtaBus } from "./etaJson.js";

export interface LineStopElement {
  id: JSX.Element;
  name: string;
  latlong: JSX.Element;
  stopId: JSX.Element;
  key: number;
}

export interface EtaBusWithID extends EtaBus {
  id: string;
}

export interface LineStopEta {
  line: string;
  stopName: string;
  routeName: string;
  etas: EtaBusWithID[];
  stopTag: number;
  type?: string;
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
  enabled?: string[];
  type?: string;
}
export interface stopBookmarksRedux {
  ids: number[];
  entities: Record<number, StopBookmark>;
}

export interface settingsItem {
  id: string;
  name: string;
  value: string;
}

export interface settingsRedux {
  ids: string[];
  entities: Record<number, settingsItem[]>;
}

export interface stopBookmarkWithEta extends StopBookmark {
  etas: EtaBusWithID[];
}
