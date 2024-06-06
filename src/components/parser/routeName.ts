export function parseRoute(routeName: string): {
  name: string;
  prefix?: string;
} {
  // remove line number, directions
  const dirAndTagRegex = /^([\w\d\s]+)-([/\w\d\s-]+)$/;
  // remove line number
  const tagRegex = /\w+-/i;
  if (dirAndTagRegex.test(routeName)) {
    const directionAndName = routeName.match(dirAndTagRegex);
    if (directionAndName)
      return {
        prefix: directionAndName[1].trim(),
        name: directionAndName[2].trim(),
      };
  }
  return { name: routeName.replace(tagRegex, "") };
}
