export interface RouteBranchStops {
    id: number,
    latitude: number,
    longitude: number,
    name: string,
    code: string

}

export interface SubwayStations {
    routeBranchesWithStops: {
        id: number,
        routeBranchStops: RouteBranchStops[],
        routeBranch: {
            id: number,
            headsign: string,
            routeId: number,
            gtfsId: string,
        }
    }[],
    Error?: boolean
}