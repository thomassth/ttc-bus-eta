import { openDB } from "idb";

const dbPromise = openDB("TTCStops", 1, {
  upgrade(db) {
    const store = db.createObjectStore("routes", {
      keyPath: "tag",
    });
    store.createIndex("tag", "tag");
    store.createIndex("title", "title");
  },
});

export async function getRoute(key) {
  return (await dbPromise).get("routes", key);
}
export async function addRoute(val) {
  return (await dbPromise).put("routes", val);
}
export async function addRoutes(vals) {
  await clear();
  const store = (await dbPromise)
    .transaction("routes", "readwrite")
    .objectStore("routes");
  vals.forEach((item) => {
    store.put(item);
  });
}
export async function del(key) {
  return (await dbPromise).delete("routes", key);
}
export async function clear() {
  return (await dbPromise).clear("routes");
}
export async function keys() {
  return (await dbPromise).getAllKeys("routes");
}
export async function getSize() {
  return (await dbPromise).count("routes");
}
