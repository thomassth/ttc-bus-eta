export function parseRoute(routeName: string): {
  name: string;
  prefix?: string;
} {
  // remove line number, directions
  const dirAndTagRegex = /^([\w\s]+)\s*-\s*(\d[\w]+\s)*([/\w\s-]+)$/;
  // remove line number
  const tagRegex = /\w+-/i;
  if (dirAndTagRegex.test(routeName)) {
    const directionAndName = routeName.match(dirAndTagRegex);
    if (directionAndName) {
      return {
        prefix: directionAndName[1].trim(),
        name: directionAndName[3].trim(),
      };
    }
  }
  return { name: routeName.replace(tagRegex, "") };
}
