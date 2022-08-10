const CtbApi = require("./Ctb");

module.exports = {
  // seq is 0-based here
  fetchEtas: async ({
    route,
    stops,
    bound,
    dest,
    seq,
    serviceType,
    co,
    nlbId,
    gtfsId,
    language,
  }) => {
    let _etas = [];
    for (const companyId of co) {
      if (companyId === "ttc" && stops.ttc) {
        _etas = etas.concat(await TtcApi.fetchEtas({}));
      } else if (companyId === "kmb" && stops.kmb) {
        _etas = _etas.concat(
          await KmbApi.fetchEtas({
            route,
            stopId: stops.kmb[seq],
            seq,
            serviceType,
            bound: bound[companyId],
          })
        );
      } else if (companyId === "ctb" && stops.ctb) {
        _etas = _etas.concat(
          await CtbApi.fetchEtas({
            stopId: stops.ctb[seq],
            route,
            bound: bound[companyId],
            seq,
          })
        );
      } else if (companyId === "nwfb" && stops.nwfb) {
        _etas = _etas.concat(
          await NwfbApi.fetchEtas({
            stopId: stops.nwfb[seq],
            route,
            bound: bound[companyId],
            seq,
          })
        );
      } else if (companyId === "nlb" && stops.nlb) {
        _etas = _etas.concat(
          await NlbApi.fetchEtas({ stopId: stops.nlb[seq], nlbId })
        );
      } else if (companyId === "lrtfeeder" && stops.lrtfeeder) {
        _etas = _etas.concat(
          await LrtfeederApi.fetchEtas({
            stopId: stops.lrtfeeder[seq],
            route,
            language,
          })
        );
      } else if (companyId === "gmb" && stops.gmb) {
        _etas = _etas.concat(
          await GmbApi.fetchEtas({
            stopId: stops.gmb[seq],
            gtfsId,
            seq,
            bound: bound[companyId],
          })
        );
      } else if (companyId === "lightRail" && stops.lightRail) {
        _etas = _etas.concat(
          await LightRailApi.fetchEtas({
            stopId: stops.lightRail[seq],
            route,
            dest,
          })
        );
      } else if (companyId === "mtr" && stops.mtr) {
        _etas = _etas.concat(
          await MtrApi.fetchEtas({
            stopId: stops.mtr[seq],
            route,
            bound: bound.mtr,
          })
        );
      }
    }

    return _etas.sort((a, b) => {
      if (a.eta === "") return 1;
      else if (b.eta === "") return -1;
      return a.eta < b.eta ? -1 : 1;
    });
  },
};
