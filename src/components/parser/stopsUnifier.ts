type NumberGroups = number[][];

// type NumberGroupLoop = number | NumberGroupLoop[][];

// (number | (number | number[][])[][])[]
// (number | number[][])[]
// number[][]
export function mergeAndGroup(
  ...arrays: NumberGroups
): (number | NumberGroups)[] {
  // Step 1: Find the common elements across all arrays
  // Step 1-single: Remove the single items (usually subway bus platforms)
  if (Array.isArray(arrays)) {
    const filteredArrays = arrays.filter((array) => array.length > 1);

    // if all arrays are single item / there's only 1 array with more than 1 item, assume there's no common
    if (filteredArrays.length < 2) return [arrays];
    const common = filteredArrays.reduce((acc, arr) =>
      acc.filter((x) => arr.includes(x))
    );

    if (common.length === 0) {
      return [arrays];
    }
    const start: NumberGroups = [];
    const end: NumberGroups = [];

    // Step 2-single: Add the single item arrays to start (they are at the start of the list)
    const singleArrays = arrays.filter((array) => array.length === 1);
    start.push(...singleArrays);

    // Step 2: Separate the front and end of the arrays

    start.push(...step2(arrays, common).start);
    end.push(...step2(arrays, common).end);

    // Step 3: Push the combined array; also loop check the before & after areas
    const combined = [];

    if (start.length === 1 && Array.isArray(start[0])) {
      combined.push(start);
    } else if (start.length > 0) {
      combined.push(...mergeAndGroup(...start));
    }
    combined.push(...common);
    if (end.length === 1 && Array.isArray(end[0])) {
      combined.push(end);
    } else if (end.length > 0) {
      combined.push(...mergeAndGroup(...end));
    }

    return combined;
  }
  return arrays;
}

function step2(arrays: NumberGroups, common: number[]) {
  const start: number[][] = [];
  const end: number[][] = [];
  function separator(fullArray: number[], commonArray: number[]) {
    const startIndex = fullArray.findIndex((item) => item === commonArray[0]);

    const beforeCommon = fullArray.slice(0, startIndex);
    if (beforeCommon.length > 0) start.push(beforeCommon);

    const afterCommon = fullArray.slice(startIndex + commonArray.length);
    if (afterCommon.length > 0) end.push(afterCommon);
  }

  arrays.forEach((array) => separator(array, common));

  return { start, end };
}
