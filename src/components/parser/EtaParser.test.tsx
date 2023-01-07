// import renderer from 'react-test-renderer';
import { expect, test } from "@jest/globals";
import renderer from "react-test-renderer";

import { etaParser } from "./EtaParser";

describe("eta parsing", () => {
  const testValues = [
    {
      title: "no ETA",
      input: {
        body: {
          predictions: [
            {
              agencyTitle: "Toronto Transit Commission",
              routeTitle: "39-Finch East",
              routeTag: "39",
              stopTitle: "480 Gordon Baker Rd",
              stopTag: "7900",
              dirTitleBecauseNoPredictions:
                "West - 39 Finch East towards Finch Station",
            },
            {
              agencyTitle: "Toronto Transit Commission",
              routeTitle: "42-Cummer",
              routeTag: "42",
              stopTitle: "480 Gordon Baker Rd",
              stopTag: "7900",
              dirTitleBecauseNoPredictions:
                "West - 42 Cummer towards Finch Station",
            },
          ],
        },
      },
    },
    {
      title: "1 predictions 1 direction",
      input: {
        body: {
          predictions: {
            direction: {
              prediction: [
                {
                  epochTime: "1672201380997",
                  seconds: "96",
                  minutes: "1",
                  isDeparture: "false",
                  affectedByLayover: "true",
                  branch: "39",
                  dirTag: "39_1_39B",
                  vehicle: "3109",
                  block: "39_67_20",
                  tripTag: "45227730",
                },
                {
                  epochTime: "1672202531994",
                  seconds: "1247",
                  minutes: "20",
                  isDeparture: "false",
                  affectedByLayover: "true",
                  branch: "39",
                  dirTag: "39_1_39B",
                  vehicle: "3264",
                  block: "39_69_30",
                  tripTag: "45227729",
                },
                {
                  epochTime: "1672203731994",
                  seconds: "2447",
                  minutes: "40",
                  isDeparture: "false",
                  affectedByLayover: "true",
                  branch: "39",
                  dirTag: "39_1_39B",
                  vehicle: "9234",
                  block: "39_71_132",
                  tripTag: "45227728",
                },
              ],
              title: "West - 39 Finch East towards Finch Station",
            },
            agencyTitle: "Toronto Transit Commission",
            routeTitle: "39-Finch East",
            routeTag: "39",
            stopTitle: "Old Finch Ave At Morningside Ave",
            stopTag: "12925",
          },
          copyright: "All data copyright Toronto Transit Commission 2022.",
        },
      },
    },
    {
      title: "1 predictions 2 directions",
      input: {
        "?xml": {
          version: "1.0",
          encoding: "utf-8",
        },
        body: {
          predictions: {
            direction: [
              {
                prediction: [
                  {
                    epochTime: "1672202160000",
                    seconds: "611",
                    minutes: "10",
                    isDeparture: "true",
                    affectedByLayover: "true",
                    branch: "39A",
                    dirTag: "39_0_39A",
                    vehicle: "3124",
                    block: "39_66_10",
                    tripTag: "45227587",
                  },
                  {
                    epochTime: "1672203360000",
                    seconds: "1811",
                    minutes: "30",
                    isDeparture: "true",
                    affectedByLayover: "true",
                    branch: "39A",
                    dirTag: "39_0_39A",
                    vehicle: "3281",
                    block: "39_72_70",
                    tripTag: "45227586",
                  },
                  {
                    epochTime: "1672204560000",
                    seconds: "3011",
                    minutes: "50",
                    isDeparture: "true",
                    affectedByLayover: "true",
                    branch: "39A",
                    dirTag: "39_0_39A",
                    vehicle: "3234",
                    block: "39_77_142",
                    tripTag: "45227585",
                  },
                ],
                title: "East - 39a Finch East towards Neilson",
              },
              {
                prediction: [
                  {
                    epochTime: "1672201560000",
                    seconds: "11",
                    minutes: "0",
                    isDeparture: "true",
                    affectedByLayover: "true",
                    branch: "39B",
                    dirTag: "39_0_39B",
                    vehicle: "9227",
                    block: "39_10_100",
                    tripTag: "45227579",
                  },
                  {
                    epochTime: "1672202760000",
                    seconds: "1211",
                    minutes: "20",
                    isDeparture: "true",
                    affectedByLayover: "true",
                    branch: "39B",
                    dirTag: "39_0_39B",
                    vehicle: "3283",
                    block: "39_12_122",
                    tripTag: "45227578",
                  },
                  {
                    epochTime: "1672203960000",
                    seconds: "2411",
                    minutes: "40",
                    isDeparture: "true",
                    affectedByLayover: "true",
                    branch: "39B",
                    dirTag: "39_0_39B",
                    vehicle: "3109",
                    block: "39_67_20",
                    tripTag: "45227577",
                  },
                ],
                title:
                  "East - 39b Finch East towards Old Finch and Morningview",
              },
            ],
            agencyTitle: "Toronto Transit Commission",
            routeTitle: "39-Finch East",
            routeTag: "39",
            stopTitle: "Finch Station",
            stopTag: "14211",
          },
          copyright: "All data copyright Toronto Transit Commission 2022.",
        },
      },
    },
    {
      title: "2 predictions 2 direction",
      input: {
        body: {
          predictions: [
            {
              agencyTitle: "Toronto Transit Commission",
              routeTitle: "339-Finch East Night Bus",
              routeTag: "339",
              stopTitle: "Finch Ave East At Wilfred Ave",
              stopTag: "8607",
              dirTitleBecauseNoPredictions:
                "East - 339 Finch East towards Markham Rd",
            },
            {
              direction: [
                {
                  prediction: [
                    {
                      epochTime: "1672202317976",
                      seconds: "338",
                      minutes: "5",
                      isDeparture: "false",
                      affectedByLayover: "true",
                      branch: "39A",
                      dirTag: "39_0_39A",
                      vehicle: "3124",
                      block: "39_66_10",
                      tripTag: "45227587",
                    },
                    {
                      epochTime: "1672203517976",
                      seconds: "1538",
                      minutes: "25",
                      isDeparture: "false",
                      affectedByLayover: "true",
                      branch: "39A",
                      dirTag: "39_0_39A",
                      vehicle: "3281",
                      block: "39_72_70",
                      tripTag: "45227586",
                    },
                    {
                      epochTime: "1672204718036",
                      seconds: "2738",
                      minutes: "45",
                      isDeparture: "false",
                      affectedByLayover: "true",
                      branch: "39A",
                      dirTag: "39_0_39A",
                      vehicle: "3234",
                      block: "39_77_142",
                      tripTag: "45227585",
                    },
                  ],
                  title: "East - 39a Finch East towards Neilson",
                },
                {
                  prediction: [
                    {
                      epochTime: "1672202426996",
                      seconds: "447",
                      minutes: "7",
                      isDeparture: "false",
                      affectedByLayover: "true",
                      branch: "39B",
                      dirTag: "39_0_39B",
                      vehicle: "9227",
                      block: "39_10_100",
                      tripTag: "45227579",
                    },
                    {
                      epochTime: "1672203268756",
                      seconds: "1289",
                      minutes: "21",
                      isDeparture: "false",
                      affectedByLayover: "true",
                      branch: "39B",
                      dirTag: "39_0_39B",
                      vehicle: "3283",
                      block: "39_12_122",
                      tripTag: "45227578",
                    },
                    {
                      epochTime: "1672204468756",
                      seconds: "2489",
                      minutes: "41",
                      isDeparture: "false",
                      affectedByLayover: "true",
                      branch: "39B",
                      dirTag: "39_0_39B",
                      vehicle: "3109",
                      block: "39_67_20",
                      tripTag: "45227577",
                    },
                  ],
                  title:
                    "East - 39b Finch East towards Old Finch and Morningview",
                },
              ],
              agencyTitle: "Toronto Transit Commission",
              routeTitle: "39-Finch East",
              routeTag: "39",
              stopTitle: "Finch Ave East At Wilfred Ave",
              stopTag: "8607",
            },
          ],
          copyright: "All data copyright Toronto Transit Commission 2022.",
        },
      },
    },
    {
      title: "empty result",
      input: {},
    },
  ];

  test.each(testValues)("$title", ({ input }) => {
    const component = renderer.create(
      <p>{JSON.stringify(etaParser(input), null, 4)}</p>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
