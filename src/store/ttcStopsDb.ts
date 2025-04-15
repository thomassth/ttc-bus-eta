import { openDB } from "idb";

import { DbStop, StopWithDistance } from "../models/db.js";

const dbPromise = openDB("TTCStops", 2, {
  upgrade(db, oldVersion, newVersion, transaction) {
    if (oldVersion < 1) {
      const store = db.createObjectStore("stops", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("lat", "lat");
      store.createIndex("lon", "lon");
    }
    if (oldVersion < 2) {
      console.log("upgrading to version 2");
      const store = transaction.objectStore("stops");
      if (!store.indexNames.contains("tag")) {
        store.createIndex("tag", "tag", { multiEntry: true });
      }
      if (!store.indexNames.contains("title")) {
        store.createIndex("title", "title", { multiEntry: true });
      }
      if (!store.indexNames.contains("lines")) {
        store.createIndex("lines", "lines", { multiEntry: true });
      }
      if (!store.indexNames.contains("stopId")) {
        store.createIndex("stopId", "stopId", { unique: true });
      }
      console.log("upgraded to version 2");
    }
  },
});

// Done with Google Gemini
export async function getStopsWithinRange(
  lat: number,
  lon: number,
  range: number
) {
  const store = (await dbPromise)
    .transaction("stops", "readonly")
    .objectStore("stops");

  const results: StopWithDistance[] = [];

  const lowerLat = lat - range;
  const upperLat = lat + range;
  const lowerLon = lon - range;
  const upperLon = lon + range;

  const latIndex = store.index("lat");
  const latCursor = await latIndex.openCursor(
    IDBKeyRange.bound(lowerLat, upperLat)
  );

  let cursor = latCursor;

  while (cursor) {
    const stop = cursor.value;
    if (stop.lon >= lowerLon && stop.lon <= upperLon) {
      // Basic distance check (can be improved with Haversine formula)
      const distance = Math.sqrt(
        Math.pow(stop.lat - lat, 2) + Math.pow(stop.lon - lon, 2)
      );
      // in meters
      // TODO: make the formula better / use libs
      const realDistance = Math.sqrt(
        Math.pow((stop.lat - lat) * 111.32 * 1000, 2) +
          Math.pow(((stop.lon - lon) * 40075 * 1000 * Math.cos(lat)) / 360, 2)
      );
      if (distance <= range) {
        results.push({ ...stop, distance, realDistance });
      }
    }
    cursor = await cursor.continue();
  }

  return results.sort((a, b) => a.realDistance - b.realDistance);
}

export async function getStop(key: string): Promise<DbStop> {
  return (await dbPromise).get("stops", key);
}
export async function addStop(val) {
  return (await dbPromise).put("stops", val);
}
export async function addStops(vals) {
  await clear();
  const store = (await dbPromise)
    .transaction("stops", "readwrite")
    .objectStore("stops");
  vals.forEach((item) => {
    store.put({
      ...item,
      lon: parseFloat(item.lon),
      lat: parseFloat(item.lat),
    });
  });
}
export async function del(key) {
  return (await dbPromise).delete("stops", key);
}
export async function clear() {
  return (await dbPromise).clear("stops");
}
export async function keys() {
  return (await dbPromise).getAllKeys("stops");
}
export async function getSize() {
  return (await dbPromise).count("stops");
}
export async function getStopsByTag(tag: string): Promise<DbStop[]> {
  const store = (await dbPromise)
    .transaction("stops", "readonly")
    .objectStore("stops");
  const tagIndex = store.index("tag");

  const results: DbStop[] = [];
  const tagCursor = await tagIndex.openCursor(IDBKeyRange.only(tag));

  let cursor = tagCursor;

  while (cursor) {
    results.push(cursor.value);
    cursor = await cursor.continue();
  }

  return results;
}
