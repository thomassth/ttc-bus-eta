import { EtaBus } from "./etaJson.js";
import { SubwayStopInfo } from "./ttc.js";

export interface LineStopElement {
  id: number;
  name: string;
  latlong: number[];
  stopId: number;
  key: number;
}

export interface EtaBusWithID extends EtaBus {
  id: string;
}

export interface LineStopEta {
  line: string | string[];
  stopName: string;
  routeName?: string;
  etas: EtaBusWithID[];
  stopTag: number;
  type?: string;
  direction?: string;
}

export interface LineStop {
  id: number;
  name: string;
  latlong: number[];
  stopId: number;
}

export interface SubwayDbRedux {
  ids: number[];
  entities: Record<number, SubwayStopInfo>;
}

export interface StopBookmark {
  stopId: number;
  name: string;
  ttcId: number;
  lines: string[];
  enabled?: string[];
  type?: string;
  direction?: string;
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
