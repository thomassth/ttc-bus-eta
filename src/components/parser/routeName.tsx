export function parseRoute(routeName: String) {
  // remove line number, directions
  const dirAndTagRegex = /\w+ - \w+ /i;
  // remove line number
  const tagRegex = /\w+-/i;
  if (routeName.match(dirAndTagRegex)) {
    return routeName.replace(dirAndTagRegex, "");
  } else {
    return routeName.replace(tagRegex, "");
  }
}
