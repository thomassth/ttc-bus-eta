export function stopsParser(
  json: any
): { id: any; name: any; latlong: any[]; stopId: any }[] {
  const result: { id: any; name: any; latlong: any[]; stopId: any }[] = [];
  console.log(json);
  if (json.body.Error === undefined) {
    json.body.route.stop.map((element: any) => {
      if (element["@_stopId"] === undefined) {
        console.log(element);
      } else {
        result.push({
          id: element["@_tag"],
          name: element["@_title"],
          latlong: [element["@_lat"], element["@_lon"]],
          stopId: element["@_stopId"],
        });
      }
      return element;
    });
  } else {
    result.push({
      name: "Error",
      id: undefined,
      latlong: [],
      stopId: undefined,
    });
  }
  console.log(result);
  return result;
}
