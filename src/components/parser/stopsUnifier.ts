export function mergeAndGroup(...arrays: number[][]) {
  // Find the common elements across all arrays
  const common = arrays.reduce((acc, arr) =>
    acc.filter((x) => arr.includes(x))
  );
  const result: number[] = [];
  const start: number[][] = [];
  const end: number[][] = [];

  arrays.forEach((arr) => {
    let group: number[] = [];
    arr.forEach((item) => {
      if (common.includes(item)) {
        if (group.length) {
          // Check if this common item is the first one to be pushed into result
          if (!result.includes(item)) {
            result.push(...group);
            group = [];
          } else {
            // Insert the group before the common item
            start.push(group);
            group = [];
          }
        }
        if (!result.includes(item)) {
          result.push(item);
        }
      } else {
        group.push(item);
      }
    });
    if (group.length) {
      // Check if the array ends with a group
      if (Array.isArray(result[result.length - 1])) {
        start.push(group);
      } else {
        end.push(group);
      }
    }
  });
  const combined = [];

  combined.push(start, ...result, end);

  return combined;
}
