export function parseRoute(routeName: string) {
  // remove line number, directions
  const dirAndTagRegex = /\w+ - \w+ /i;
  // remove line number
  const tagRegex = /\w+-/i;
  if (dirAndTagRegex.test(routeName)) {
    return routeName.replace(dirAndTagRegex, "");
  } else {
    return routeName.replace(tagRegex, "");
  }
}
