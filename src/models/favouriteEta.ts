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
