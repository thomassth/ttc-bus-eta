// import renderer from 'react-test-renderer';
import { etaParser } from "./EtaParser";
import { expect, test } from "@jest/globals";
import renderer from "react-test-renderer";

describe("eta parsing", () => {
  const testValues = [
    {
      title: "no ETA",
      input: {
        body: {
          predictions: [
            {
              "@_agencyTitle": "Toronto Transit Commission",
              "@_routeTitle": "39-Finch East",
              "@_routeTag": "39",
              "@_stopTitle": "480 Gordon Baker Rd",
              "@_stopTag": "7900",
              "@_dirTitleBecauseNoPredictions":
                "West - 39 Finch East towards Finch Station",
            },
            {
              "@_agencyTitle": "Toronto Transit Commission",
              "@_routeTitle": "42-Cummer",
              "@_routeTag": "42",
              "@_stopTitle": "480 Gordon Baker Rd",
              "@_stopTag": "7900",
              "@_dirTitleBecauseNoPredictions":
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
                  "@_epochTime": "1672201380997",
                  "@_seconds": "96",
                  "@_minutes": "1",
                  "@_isDeparture": "false",
                  "@_affectedByLayover": "true",
                  "@_branch": "39",
                  "@_dirTag": "39_1_39B",
                  "@_vehicle": "3109",
                  "@_block": "39_67_20",
                  "@_tripTag": "45227730",
                },
                {
                  "@_epochTime": "1672202531994",
                  "@_seconds": "1247",
                  "@_minutes": "20",
                  "@_isDeparture": "false",
                  "@_affectedByLayover": "true",
                  "@_branch": "39",
                  "@_dirTag": "39_1_39B",
                  "@_vehicle": "3264",
                  "@_block": "39_69_30",
                  "@_tripTag": "45227729",
                },
                {
                  "@_epochTime": "1672203731994",
                  "@_seconds": "2447",
                  "@_minutes": "40",
                  "@_isDeparture": "false",
                  "@_affectedByLayover": "true",
                  "@_branch": "39",
                  "@_dirTag": "39_1_39B",
                  "@_vehicle": "9234",
                  "@_block": "39_71_132",
                  "@_tripTag": "45227728",
                },
              ],
              "@_title": "West - 39 Finch East towards Finch Station",
            },
            "@_agencyTitle": "Toronto Transit Commission",
            "@_routeTitle": "39-Finch East",
            "@_routeTag": "39",
            "@_stopTitle": "Old Finch Ave At Morningside Ave",
            "@_stopTag": "12925",
          },
          "@_copyright": "All data copyright Toronto Transit Commission 2022.",
        },
      },
    },
    {
      title: "1 predictions 2 directions",
      input: {
        "?xml": {
          "@_version": "1.0",
          "@_encoding": "utf-8",
        },
        body: {
          predictions: {
            direction: [
              {
                prediction: [
                  {
                    "@_epochTime": "1672202160000",
                    "@_seconds": "611",
                    "@_minutes": "10",
                    "@_isDeparture": "true",
                    "@_affectedByLayover": "true",
                    "@_branch": "39A",
                    "@_dirTag": "39_0_39A",
                    "@_vehicle": "3124",
                    "@_block": "39_66_10",
                    "@_tripTag": "45227587",
                  },
                  {
                    "@_epochTime": "1672203360000",
                    "@_seconds": "1811",
                    "@_minutes": "30",
                    "@_isDeparture": "true",
                    "@_affectedByLayover": "true",
                    "@_branch": "39A",
                    "@_dirTag": "39_0_39A",
                    "@_vehicle": "3281",
                    "@_block": "39_72_70",
                    "@_tripTag": "45227586",
                  },
                  {
                    "@_epochTime": "1672204560000",
                    "@_seconds": "3011",
                    "@_minutes": "50",
                    "@_isDeparture": "true",
                    "@_affectedByLayover": "true",
                    "@_branch": "39A",
                    "@_dirTag": "39_0_39A",
                    "@_vehicle": "3234",
                    "@_block": "39_77_142",
                    "@_tripTag": "45227585",
                  },
                ],
                "@_title": "East - 39a Finch East towards Neilson",
              },
              {
                prediction: [
                  {
                    "@_epochTime": "1672201560000",
                    "@_seconds": "11",
                    "@_minutes": "0",
                    "@_isDeparture": "true",
                    "@_affectedByLayover": "true",
                    "@_branch": "39B",
                    "@_dirTag": "39_0_39B",
                    "@_vehicle": "9227",
                    "@_block": "39_10_100",
                    "@_tripTag": "45227579",
                  },
                  {
                    "@_epochTime": "1672202760000",
                    "@_seconds": "1211",
                    "@_minutes": "20",
                    "@_isDeparture": "true",
                    "@_affectedByLayover": "true",
                    "@_branch": "39B",
                    "@_dirTag": "39_0_39B",
                    "@_vehicle": "3283",
                    "@_block": "39_12_122",
                    "@_tripTag": "45227578",
                  },
                  {
                    "@_epochTime": "1672203960000",
                    "@_seconds": "2411",
                    "@_minutes": "40",
                    "@_isDeparture": "true",
                    "@_affectedByLayover": "true",
                    "@_branch": "39B",
                    "@_dirTag": "39_0_39B",
                    "@_vehicle": "3109",
                    "@_block": "39_67_20",
                    "@_tripTag": "45227577",
                  },
                ],
                "@_title":
                  "East - 39b Finch East towards Old Finch and Morningview",
              },
            ],
            "@_agencyTitle": "Toronto Transit Commission",
            "@_routeTitle": "39-Finch East",
            "@_routeTag": "39",
            "@_stopTitle": "Finch Station",
            "@_stopTag": "14211",
          },
          "@_copyright": "All data copyright Toronto Transit Commission 2022.",
        },
      },
    },
    {
      title: "2 predictions 2 direction",
      input: {
        body: {
          predictions: [
            {
              "@_agencyTitle": "Toronto Transit Commission",
              "@_routeTitle": "339-Finch East Night Bus",
              "@_routeTag": "339",
              "@_stopTitle": "Finch Ave East At Wilfred Ave",
              "@_stopTag": "8607",
              "@_dirTitleBecauseNoPredictions":
                "East - 339 Finch East towards Markham Rd",
            },
            {
              direction: [
                {
                  prediction: [
                    {
                      "@_epochTime": "1672202317976",
                      "@_seconds": "338",
                      "@_minutes": "5",
                      "@_isDeparture": "false",
                      "@_affectedByLayover": "true",
                      "@_branch": "39A",
                      "@_dirTag": "39_0_39A",
                      "@_vehicle": "3124",
                      "@_block": "39_66_10",
                      "@_tripTag": "45227587",
                    },
                    {
                      "@_epochTime": "1672203517976",
                      "@_seconds": "1538",
                      "@_minutes": "25",
                      "@_isDeparture": "false",
                      "@_affectedByLayover": "true",
                      "@_branch": "39A",
                      "@_dirTag": "39_0_39A",
                      "@_vehicle": "3281",
                      "@_block": "39_72_70",
                      "@_tripTag": "45227586",
                    },
                    {
                      "@_epochTime": "1672204718036",
                      "@_seconds": "2738",
                      "@_minutes": "45",
                      "@_isDeparture": "false",
                      "@_affectedByLayover": "true",
                      "@_branch": "39A",
                      "@_dirTag": "39_0_39A",
                      "@_vehicle": "3234",
                      "@_block": "39_77_142",
                      "@_tripTag": "45227585",
                    },
                  ],
                  "@_title": "East - 39a Finch East towards Neilson",
                },
                {
                  prediction: [
                    {
                      "@_epochTime": "1672202426996",
                      "@_seconds": "447",
                      "@_minutes": "7",
                      "@_isDeparture": "false",
                      "@_affectedByLayover": "true",
                      "@_branch": "39B",
                      "@_dirTag": "39_0_39B",
                      "@_vehicle": "9227",
                      "@_block": "39_10_100",
                      "@_tripTag": "45227579",
                    },
                    {
                      "@_epochTime": "1672203268756",
                      "@_seconds": "1289",
                      "@_minutes": "21",
                      "@_isDeparture": "false",
                      "@_affectedByLayover": "true",
                      "@_branch": "39B",
                      "@_dirTag": "39_0_39B",
                      "@_vehicle": "3283",
                      "@_block": "39_12_122",
                      "@_tripTag": "45227578",
                    },
                    {
                      "@_epochTime": "1672204468756",
                      "@_seconds": "2489",
                      "@_minutes": "41",
                      "@_isDeparture": "false",
                      "@_affectedByLayover": "true",
                      "@_branch": "39B",
                      "@_dirTag": "39_0_39B",
                      "@_vehicle": "3109",
                      "@_block": "39_67_20",
                      "@_tripTag": "45227577",
                    },
                  ],
                  "@_title":
                    "East - 39b Finch East towards Old Finch and Morningview",
                },
              ],
              "@_agencyTitle": "Toronto Transit Commission",
              "@_routeTitle": "39-Finch East",
              "@_routeTag": "39",
              "@_stopTitle": "Finch Ave East At Wilfred Ave",
              "@_stopTag": "8607",
            },
          ],
          "@_copyright": "All data copyright Toronto Transit Commission 2022.",
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
