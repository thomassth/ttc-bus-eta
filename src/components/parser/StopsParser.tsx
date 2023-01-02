export interface LineStop {
  id: number;
  name: string;
  latlong: number[];
  stopId: number;
}
export function stopsParser(json: any): LineStop[] {
  const result: LineStop[] = [];
  console.log(json);
  if (json.body.Error === undefined) {
    json.body.route.stop.map((element: any) => {
      if (element["@_stopId"] === undefined) {
        console.log(element);
      } else {
        result.push({
          id: parseInt(element["@_tag"]),
          name: element["@_title"],
          latlong: [parseFloat(element["@_lat"]), parseFloat(element["@_lon"])],
          stopId: parseInt(element["@_stopId"]),
        });
      }
      return element;
    });
  } else {
    result.push({
      name: "Error",
      id: -1,
      latlong: [],
      stopId: -1,
    });
  }
  console.log(result);
  return result;
}
