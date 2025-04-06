// import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import { queryOptions } from "@tanstack/react-query";

import {
  EtaPredictionJson,
  RouteJson,
  RoutesJson,
} from "../../models/etaJson.js";
import { parsedVehicleLocation } from "../../models/ttc.js";

export const ttcStops = (stopId: number) =>
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
  });

export const ttcVehicleLocation = (vehicle: number) =>
  queryOptions<parsedVehicleLocation>({
    queryKey: ["ttc-vehicle-location"],
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
