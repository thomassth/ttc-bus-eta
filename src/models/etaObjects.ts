import { Eta, EtaBus } from "./etaXml";

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

// routeTag = `53`A `53`B
// branchTag = 53`A` 53`B`
export interface BranchEta extends CommonEta {
  branchTag: string;
  stopTitle: string;
  destination: string;
  etas?: number[];
  routeTitle: string;
}

export interface FavouriteEta extends CommonEta {}

interface CommonEta {
  id: string;
  stopTag: string;
  routeTag: string;
  stopId?: string;
}

export interface FavouriteEtaRedux {
  ids: string[];
  entities: { [key: string]: FavouriteEta };
}
