export function parseRoute(routeName: String) {
  // remove line number, directions
  const regex = /\w+ - \w+ /i;
  return routeName.replace(regex, "");
}
