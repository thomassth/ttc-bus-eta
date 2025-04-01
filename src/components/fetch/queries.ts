// import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import { queryOptions } from "@tanstack/react-query";
import GtfsRealtimeBindings from "gtfs-realtime-bindings";

import {
  EtaPredictionJson,
  RoutesJson,
  SubwayClosureJson,
} from "../../models/etaJson.js";

export const ttcAlerts = queryOptions<{
  feed: { post: { record: { text: string } } }[];
}>({
  queryKey: ["bsky"],
  queryFn: async () => {
    const response = await fetch(
      "https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=ttcalerts.bsky.social"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  },
  staleTime: 60 * 1000,
  refetchInterval: 60 * 1000,
});

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
    placeholderData: (prev: any) => prev,
  });

export const fetchSubwayClosure = (date: string) =>
  queryOptions<SubwayClosureJson[]>({
    queryKey: [`ttc-subway-closure-${date}`],
    queryFn: async () => {
      const response = await fetch(
        `https://thomassth.github.io/to-bus-stations/data/ttc/subway-closures/${date}.json`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    placeholderData: (prev: any) => prev,
    retry: 0,
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

// inaccessible; CORS Missing Allow Origin
export const gtfsAlerts = queryOptions({
  queryKey: ["gtfs-alerts"],
  queryFn: async () => {
    const response = await fetch("https://bustime.ttc.ca/gtfsrt/alerts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(buffer)
    );

    return feed.toJSON();
  },
  staleTime: 60 * 1000,
  refetchInterval: 60 * 1000,
});
