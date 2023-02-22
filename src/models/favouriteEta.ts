export interface FavouriteEta {
  id: string;
  stopTag: string;
  routeTag: string;
  stopId?: string;
}

// routeTag = `53`A `53`B
// branchTag = 53`A` 53`B`
export interface BranchEta extends FavouriteEta {
  branchTag: string;
  stopTitle: string;
  destination: string;
  etas?: number[];
  routeTitle: string;
}

export interface FavouriteEtaRedux {
  ids: string[];
  entities: { [key: string]: FavouriteEta };
}

export interface EtaContainerParams {
  dataUrl: string;
  shdShowTitle?: boolean;
  shdFilterNonFavourite?: boolean;
  stopId?: string;
}
