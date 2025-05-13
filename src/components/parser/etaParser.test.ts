import { expect, test } from "vitest";
import { etaParser } from "./etaParser.js";

test("ETA parser", () => {
  expect(
    etaParser({
      copyright: "All data copyright Toronto Transit Commission 2025.",
      predictions: {
        routeTag: "134",
        stopTag: "4768",
        routeTitle: "134-Progress",
        agencyTitle: "Toronto Transit Commission",
        stopTitle: "88 Corporate Dr",
        direction: {
          prediction: [
            {
              seconds: "227",
              tripTag: "48671780",
              minutes: "3",
              isDeparture: "false",
              block: "134_3_30",
              dirTag: "134_0_134Dr",
              branch: "134D",
              epochTime: "1746989902252",
              vehicle: "1301",
            },
            {
              affectedByLayover: "true",
              seconds: "2921",
              tripTag: "48671779",
              minutes: "48",
              isDeparture: "false",
              block: "134_1_10",
              dirTag: "134_0_134Dr",
              branch: "134D",
              epochTime: "1746992596361",
              vehicle: "3476",
            },
            {
              affectedByLayover: "true",
              seconds: "3240",
              tripTag: "48671778",
              minutes: "54",
              isDeparture: "false",
              block: "134_2_20",
              dirTag: "134_0_134Dr",
              branch: "134D",
              epochTime: "1746992915697",
              vehicle: "1674",
            },
          ],
          title:
            "South - 134d Progress towards Scarborough Centre Stn via Centennial College",
        },
      },
    })
  ).toEqual([
    {
      direction: "South",
      etas: [
        {
          affectedByLayover: undefined,
          block: "134_3_30",
          branch: "134D",
          dirTag: "134_0_134Dr",
          epochTime: "1746989902252",
          id: "48671780",
          isDeparture: "false",
          minutes: "3",
          seconds: "227",
          tripTag: "48671780",
          vehicle: "1301",
        },
        {
          affectedByLayover: "true",
          block: "134_1_10",
          branch: "134D",
          dirTag: "134_0_134Dr",
          epochTime: "1746992596361",
          id: "48671779",
          isDeparture: "false",
          minutes: "48",
          seconds: "2921",
          tripTag: "48671779",
          vehicle: "3476",
        },
        {
          affectedByLayover: "true",
          block: "134_2_20",
          branch: "134D",
          dirTag: "134_0_134Dr",
          epochTime: "1746992915697",
          id: "48671778",
          isDeparture: "false",
          minutes: "54",
          seconds: "3240",
          tripTag: "48671778",
          vehicle: "1674",
        },
      ],
      line: "134D",
      routeName: "Progress",
      stopName: "88 Corporate Dr",
      stopTag: 4768,
    },
  ]);
});
