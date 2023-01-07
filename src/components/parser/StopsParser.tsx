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
      if (element.stopId === undefined) {
        console.log(element);
      } else {
        result.push({
          id: parseInt(element.tag),
          name: element.title,
          latlong: [parseFloat(element.lat), parseFloat(element.lon)],
          stopId: parseInt(element.stopId),
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
