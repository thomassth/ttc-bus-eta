import { openDB } from "idb";

const dbPromise = openDB("TTCStops", 1, {
  upgrade(db) {
    // Create a store of objects
    const store = db.createObjectStore("stops", {
      // The 'id' property of the object will be the key.
      keyPath: "id",
      // If it isn't explicitly set, create a value by auto incrementing.
      autoIncrement: true,
    });
    // Create an index on the 'date' property of the objects.
    store.createIndex("lat", "lat");
    store.createIndex("lon", "lon");
  },
});

export async function get(key) {
  return (await dbPromise).get("stops", key);
}
export async function set(key, val) {
  return (await dbPromise).put("stops", val, key);
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
