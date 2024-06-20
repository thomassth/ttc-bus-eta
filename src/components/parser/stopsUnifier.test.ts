import { expect, test } from "vitest";

import { mergeAndGroup } from "./stopsUnifier.js";

test("route merger tests", () => {
  const arr1 = [1, 2, 3, 4, 5, 6, 7, 8];
  const arr2 = [-1, -2, -3, 1, 2, 3, 77, 76, 75];
  const arr3 = [9, 10, 1, 2, 3, 11, 12];
  const arr4 = [1, 2, 3];

  expect(mergeAndGroup(arr4, arr1, arr2, arr3)).toEqual([
    [
      [-1, -2, -3],
      [9, 10],
    ],
    1,
    2,
    3,
    [
      [4, 5, 6, 7, 8],
      [77, 76, 75],
      [11, 12],
    ],
  ]);
});
