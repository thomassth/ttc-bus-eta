const utils = require("./utils");
const { XMLParser } = require("fast-xml-parser");

module.exports = {
  co: "ttc",
  fetchStops: ({ stopId, route, bound, seq }) => {
    fetch(
      `https://webservices.umoiq.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=${line}`,
      {
        cache: utils.isSafari ? "default" : "no-store",
      }
    )
      .then((response) =>
        response.text().then((str) => {
          const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_",
          });
          const dataJson = parser.parse(str);
        })
      )

      .then((data) =>
        data
          .filter((eta) => eta.eta && eta.dir === bound)
          // filter the eta by the stop sequence information
          // as the route data may not 100% match
          // use the nearest seq
          .sort((a, b) =>
            Math.abs(a.seq - seq) < Math.abs(b.seq - seq) ? -1 : 1
          )
          .filter((eta, idx, self) => eta.seq === self[0].seq)
          .map((e) => ({
            eta: e.eta,
            remark: {
              zh: e.rmk_tc,
              en: e.rmk_en,
            },
            co: "ttc",
          }))
      );
  },
};
