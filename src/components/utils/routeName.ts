export function removeSpecialChars(routeName: string) {
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

export function parseRouteTitle(input: string) {
  const routeTitleRegex = /\d+-/;
  if (routeTitleRegex.test(input)) {
    return input.replace(routeTitleRegex, "");
  } else {
    return input;
  }
}
