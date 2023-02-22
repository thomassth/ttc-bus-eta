const endpoint = "https://webservices.umoiq.com/service/publicXMLFeed?command=";

export const multiRouteDataEndpoint = `${endpoint}predictionsForMultiStops&a=ttc`;

export const stopsDataEndpoint = `${endpoint}predictions&a=ttc&stopId=`;

export const lineDataEndpoint = `${endpoint}routeConfig&a=ttc&r=`;

export const routeListEndpoint = `${endpoint}routeList&a=ttc`;
