export function mergeAndGroup(...arrays: number[][]): (number | number[][])[] {
  // Step 1: Find the common elements across all arrays
  // Step 1-single: Remove the single items (usually subway bus platforms)
  const filteredArrays = arrays.filter((array) => array.length > 1);
  if (filteredArrays.length === 0) return [arrays];
  const common = filteredArrays.reduce((acc, arr) =>
    acc.filter((x) => arr.includes(x))
  );

  if (common.length === 0) {
    return [arrays];
  }
  const start: number[][] = [];
  const end: number[][] = [];

  // Step 2-single: Add the single item arrays to start (they are at the start of the list)
  const singleArrays = arrays.filter((array) => array.length === 1);
  start.push(...singleArrays);

  // Step 2: Separate the front and end of the arrays
  function separator(fullArray: number[], commonArray: number[]) {
    const startIndex = fullArray.findIndex((item) => item === commonArray[0]);

    const beforeCommon = fullArray.slice(0, startIndex);
    if (beforeCommon.length > 0) start.push(beforeCommon);

    const afterCommon = fullArray.slice(startIndex + commonArray.length);
    if (afterCommon.length > 0) end.push(afterCommon);
  }

  arrays.forEach((array) => separator(array, common));

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
  }
  if (end.length > 0) {
    combined.push(...mergeAndGroup(...end));
  }

  return combined;
}
