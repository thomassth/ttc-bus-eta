// import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import { queryOptions } from "@tanstack/react-query";

import {
  EtaPredictionJson,
  RouteJson,
  RoutesJson,
} from "../../models/etaJson.js";
import {
  SubwayStations,
  SubwayStop,
  parsedVehicleLocation,
} from "../../models/ttc.js";

export const ttcStopPrediction = (stopId: number) =>
  queryOptions<EtaPredictionJson>({
    queryKey: [`ttc-stop-${stopId}`],
    queryFn: async () => {
      const response = await fetch(
        `https://webservices.umoiq.com/service/publicJSONFeed?command=predictions&a=ttc&stopId=${stopId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });

export const ttcLineStopPrediction = (line: number, stopNum: number) =>
  queryOptions<EtaPredictionJson>({
    queryKey: [`ttc-line-stop-${line}-${stopNum}`],
    queryFn: async () => {
      const response = await fetch(
        `https://webservices.umoiq.com/service/publicJSONFeed?command=predictions&a=ttc&r=${line}&s=${stopNum}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });

export const ttcLines = queryOptions<RoutesJson["body"]>({
  queryKey: ["ttc-lines"],
  queryFn: async () => {
    const response = await fetch(
      "https://webservices.umoiq.com/service/publicJSONFeed?command=routeList&a=ttc"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  },
  staleTime: 24 * 60 * 60 * 1000,
  refetchInterval: 60 * 1000,
  placeholderData: (prev) => prev,
});

export const ttcRoute = (line: number) =>
  queryOptions<RouteJson>({
    queryKey: [`ttc-route-${line}`],
    queryFn: async () => {
      const response = await fetch(
        `https://webservices.umoiq.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=${line}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    staleTime: 24 * 60 * 60 * 1000,
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });

export const ttcVehicleLocation = (vehicle: number) =>
  queryOptions<parsedVehicleLocation>({
    queryKey: [`ttc-vehicle-location-${vehicle}`],
    queryFn: async () => {
      const response = await fetch(
        `https://webservices.umoiq.com/service/publicJSONFeed?command=vehicleLocation&a=ttc&v=${vehicle}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });

export const ttcSubwayPredictions = (stopNum: number) =>
  queryOptions<SubwayStop[]>({
    queryKey: [`ttc-subway-predictions-${stopNum}`],
    queryFn: async () => {
      const response = await fetch(
        `https://ntas.ttc.ca/api/ntas/get-next-train-time/${stopNum}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });

export const ttcSubwayLine = (lineNum: number) =>
  queryOptions<SubwayStations>({
    queryKey: [`ttc-subway-line-${lineNum}`],
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://www.ttc.ca/ttcapi/routedetail/get?id=${lineNum}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      } catch (error) {
        return { routeBranchesWithStops: [], Error: true };
      }
    },
    staleTime: 24 * 60 * 60 * 1000,
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });

// currently not used due to bad handling of bad stop ids
export const ttcMultiStopsPredictions = (fetchUrl: string) =>
  queryOptions<EtaPredictionJson>({
    queryKey: [`ttc-multi-stops-predictions-${fetchUrl}`],
    queryFn: async () => {
      const response = await fetch(
        `https://webservices.umoiq.com/service/publicJSONFeed?command=predictionsForMultiStops&a=ttc${fetchUrl}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });
