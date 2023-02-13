import { Dexie, Table } from "dexie";

import { StopBookmark } from "./etaObjects";

export class DbSubclass extends Dexie {
  stops!: Table<StopBookmark>;

  constructor() {
    super("myDb");
    this.version(1).stores({
      stops: "++stopId, name",
    });
  }
}

export const db = new DbSubclass();
