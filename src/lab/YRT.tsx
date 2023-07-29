import { Text, Title2 } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { YRTBadge } from "../components/badges";
import { CountdownSec } from "../components/countdown/CountdownSec";
import { LinesRequest } from "../models/yrt";
import styles from "./yrt.module.css";

export default function YRT() {
  const params = useParams();
  const stopNum = parseInt(`${params.stopId}`);

  const [response, setResponse] = useState<LinesRequest>({});
  const [countdownItems, setCountdownItems] = useState<any[]>();
  useEffect(() => {
    document.title = `Stop ID ${stopNum} | YRT arrivals`;
  });
  useEffect(() => {
    const controller = new AbortController();

    const fetchEtaData = async () => {
      // let response = { "version": "1.1", "result": [{ "StopTimeResult": [{ "Lines": [{ "LineDirId": 371021, "StopId": 723, "StopName": "HWY 7 \/ WESTON", "StopAbbr": "9710", "DirectionName": "WESTBOUND", "LineDirIdConst": 27811, "LineName": "VIVA ORANGE", "LineAbbr": "605", "LineId": 37102, "LineClusterAbbr": "VIVA", "CLUSTERDESCRIPTION": "VIVA Route", "LineIdConst": 2781, "ML_ACCESSIBILITYMASK": 1, "TransportationModeAbbr": "", "NUMERICALSEARCHFIELD": "605", "CUSTOMFIELD": "9710", "LineColour": "#fbaf33", "TransportationModeDescr": "", "TransportationModeType": "", "NoService": false, "FirstStopAfterFromTime": "20230723000220", "AgencyId": 1, "AgencyAbbr": "", "AgencyName": "", "NumericalSort": "605" }, { "LineDirId": 370941, "StopId": 723, "StopName": "HWY 7 \/ WESTON", "StopAbbr": "9710", "DirectionName": "WESTBOUND", "LineDirIdConst": 115441, "LineName": "BRAMPTON TRANSIT Züm HWY 7 -QUEEN", "LineAbbr": "501", "LineId": 37094, "LineClusterAbbr": "BRAMPTON", "LineIdConst": 11544, "ML_ACCESSIBILITYMASK": 1, "TransportationModeAbbr": "", "NUMERICALSEARCHFIELD": "501", "CUSTOMFIELD": "9710", "LineColour": "#ef3e42", "TransportationModeDescr": "", "TransportationModeType": "", "NoService": false, "FirstStopAfterFromTime": "20230723029640", "AgencyId": 1, "AgencyAbbr": "", "AgencyName": "", "NumericalSort": "501" }], "StopTimes": [{ "ETime": 89200, "ETimeSPC": 1083, "ETimeMPC": 18, "Date": 20230722, "ETimeUnadjusted": 89200, "BayNum": 0, "DateUnadjusted": 20230722, "TripId": 4737552, "BlockId": 620751, "BlockNum": 605001, "LineGroup": 35902, "ServiceGroupId": 4, "StopFlag": 0, "StopTimesIndex": 3, "DestinationSign": "Orange to Martin Grove", "LastTripOfDayLineDir": "No", "LastTripOfDayPattern": "No", "SignId": 401, "LineDirId": 371021, "PatternId": 177936, "OriginalStopTime": 89200, "StopId": "723", "StopNum": 6, "StopPublicId": "9710", "StopLat": 43789170, "StopLon": -79548425, "IvrNum": 9710, "NodeId": 0, "NodeName": "", "StopName": "HWY 7 \/ WESTON", "StopAbbr": "9710", "LineName": "VIVA ORANGE", "LineAbbr": "605", "DirectionName": "WESTBOUND" }, { "ETime": 90280, "ETimeSPC": 2163, "ETimeMPC": 36, "Date": 20230722, "ETimeUnadjusted": 90280, "BayNum": 0, "DateUnadjusted": 20230722, "TripId": 4737551, "BlockId": 620748, "BlockNum": 605004, "LineGroup": 35902, "ServiceGroupId": 4, "StopFlag": 0, "StopTimesIndex": 4, "DestinationSign": "Orange to Martin Grove", "LastTripOfDayLineDir": "No", "LastTripOfDayPattern": "No", "SignId": 401, "LineDirId": 371021, "PatternId": 177936, "OriginalStopTime": 90280, "StopId": "723", "StopNum": 6, "StopPublicId": "9710", "StopLat": 43789170, "StopLon": -79548425, "IvrNum": 9710, "NodeId": 0, "NodeName": "", "StopName": "HWY 7 \/ WESTON", "StopAbbr": "9710", "LineName": "VIVA ORANGE", "LineAbbr": "605", "DirectionName": "WESTBOUND" }, { "ETime": 91720, "ETimeSPC": 3603, "ETimeMPC": 60, "Date": 20230722, "ETimeUnadjusted": 91720, "BayNum": 0, "DateUnadjusted": 20230722, "TripId": 4737550, "BlockId": 620749, "BlockNum": 605005, "LineGroup": 35902, "ServiceGroupId": 4, "StopFlag": 0, "StopTimesIndex": 5, "DestinationSign": "Orange to Martin Grove", "LastTripOfDayLineDir": "Yes", "LastTripOfDayPattern": "Yes", "SignId": 401, "LineDirId": 371021, "PatternId": 177936, "OriginalStopTime": 91720, "StopId": "723", "StopNum": 6, "StopPublicId": "9710", "StopLat": 43789170, "StopLon": -79548425, "IvrNum": 9710, "NodeId": 0, "NodeName": "", "StopName": "HWY 7 \/ WESTON", "StopAbbr": "9710", "LineName": "VIVA ORANGE", "LineAbbr": "605", "DirectionName": "WESTBOUND" }, { "ETime": 29640, "ETimeSPC": 27923, "ETimeMPC": 465, "Date": 20230723, "ETimeUnadjusted": 29640, "BayNum": 0, "DateUnadjusted": 20230723, "TripId": 4735487, "BlockId": 620595, "BlockNum": 501001, "LineGroup": 35896, "ServiceGroupId": 5, "StopFlag": 0, "StopTimesIndex": 10, "DestinationSign": "RT 501 - BramptonTransit Züm - Hwy 7 • Queen to Downtown Brampton Terminal", "LastTripOfDayLineDir": "No", "LastTripOfDayPattern": "No", "SignId": 401, "LineDirId": 370941, "PatternId": 177909, "OriginalStopTime": 29640, "StopId": "723", "StopNum": 4, "StopPublicId": "9710", "StopLat": 43789170, "StopLon": -79548425, "IvrNum": 9710, "NodeId": 113, "NodeName": "WESTON \/ HWY 7", "StopName": "HWY 7 \/ WESTON", "StopAbbr": "9710", "LineName": "BRAMPTON TRANSIT Züm HWY 7 -QUEEN", "LineAbbr": "501", "DirectionName": "WESTBOUND" }, { "ETime": 31380, "ETimeSPC": 29663, "ETimeMPC": 494, "Date": 20230723, "ETimeUnadjusted": 31380, "BayNum": 0, "DateUnadjusted": 20230723, "TripId": 4735486, "BlockId": 620596, "BlockNum": 501004, "LineGroup": 35896, "ServiceGroupId": 5, "StopFlag": 0, "StopTimesIndex": 12, "DestinationSign": "RT 501 - BramptonTransit Züm - Hwy 7 • Queen to Downtown Brampton Terminal", "LastTripOfDayLineDir": "No", "LastTripOfDayPattern": "No", "SignId": 401, "LineDirId": 370941, "PatternId": 177909, "OriginalStopTime": 31380, "StopId": "723", "StopNum": 4, "StopPublicId": "9710", "StopLat": 43789170, "StopLon": -79548425, "IvrNum": 9710, "NodeId": 113, "NodeName": "WESTON \/ HWY 7", "StopName": "HWY 7 \/ WESTON", "StopAbbr": "9710", "LineName": "BRAMPTON TRANSIT Züm HWY 7 -QUEEN", "LineAbbr": "501", "DirectionName": "WESTBOUND" }, { "ETime": 33060, "ETimeSPC": 31343, "ETimeMPC": 522, "Date": 20230723, "ETimeUnadjusted": 33060, "BayNum": 0, "DateUnadjusted": 20230723, "TripId": 4735485, "BlockId": 620597, "BlockNum": 501002, "LineGroup": 35896, "ServiceGroupId": 5, "StopFlag": 0, "StopTimesIndex": 14, "DestinationSign": "RT 501 - BramptonTransit Züm - Hwy 7 • Queen to Downtown Brampton Terminal", "LastTripOfDayLineDir": "No", "LastTripOfDayPattern": "No", "SignId": 401, "LineDirId": 370941, "PatternId": 177909, "OriginalStopTime": 33060, "StopId": "723", "StopNum": 4, "StopPublicId": "9710", "StopLat": 43789170, "StopLon": -79548425, "IvrNum": 9710, "NodeId": 113, "NodeName": "WESTON \/ HWY 7", "StopName": "HWY 7 \/ WESTON", "StopAbbr": "9710", "LineName": "BRAMPTON TRANSIT Züm HWY 7 -QUEEN", "LineAbbr": "501", "DirectionName": "WESTBOUND" }], "ServiceResumesTimes": [], "GeneralRemarks": [], "StopIdRemarks": [], "LinesRemarks": [], "TimesRemarks": [], "StopNumTotal": 0, "StopNumReturned": 0, "StopNewRadius": 0.0, "Validation": [{ "Name": "Service", "Instance": 1, "Type": "message", "Code": "CONTEXTOK", "Message": "Context successfully found for date 20230723:  SignUp=401, ServiceGroup=5 [ExcCombo=656]", "Action": "none" }, { "Name": "Service", "Instance": 1, "Type": "message", "Code": "CONTEXTOK", "Message": "Context successfully found for date 20230723:  SignUp=401, ServiceGroup=5 [ExcCombo=656]", "Action": "none" }, { "Name": "Service", "Instance": 1, "Type": "message", "Code": "CONTEXTOK", "Message": "Context successfully found for date 20230723:  SignUp=401, ServiceGroup=5 [ExcCombo=656]", "Action": "none" }, { "Name": "Service", "Instance": 1, "Type": "message", "Code": "CONTEXTOK", "Message": "Context successfully found for date 20230722:  SignUp=401, ServiceGroup=4 [ExcCombo=644]", "Action": "none" }, { "Name": "Request", "Instance": 1, "Type": "message", "Code": "TR", "Message": "87 stop times were found", "Action": "none" }, { "Name": "Request", "Instance": 1, "Type": "message", "Code": "QH", "Message": "0 historical times were suppressed", "Action": "none" }, { "Name": "Request", "Instance": 1, "Type": "message", "Code": "QX", "Message": "0 excess times were suppressed", "Action": "none" }, { "Name": "Request", "Instance": 1, "Type": "message", "Code": "QE", "Message": "0 empty times were suppressed", "Action": "none" }, { "Name": "Request", "Instance": 1, "Type": "message", "Code": "QV", "Message": "0 previously viewed times were suppressed", "Action": "none" }, { "Name": "Request", "Instance": 1, "Type": "message", "Code": "QU", "Message": "0 unload-only times were suppressed", "Action": "none" }, { "Name": "Request", "Instance": 1, "Type": "message", "Code": "ST", "Message": "87 stop times were reported", "Action": "none" }, { "Name": "Service", "Instance": 1, "Type": "message", "Code": "CONTEXTOK", "Message": "Context successfully found for date 20230723:  SignUp=401, ServiceGroup=5 [ExcCombo=656]", "Action": "none" }, { "Name": "Service", "Instance": 1, "Type": "message", "Code": "CONTEXTOK", "Message": "Context successfully found for date 20230722:  SignUp=401, ServiceGroup=4 [ExcCombo=644]", "Action": "none" }, { "Name": "Request", "Instance": 1, "Type": "message", "Code": "RS", "Message": "2 solutions were found for the request", "Action": "none", "Extra": [] }], "StopTimesOutput": [{ "ETime": 89200, "ETimeSPC": 1083, "ETimeMPC": 18, "Date": 20230722, "ETimeUnadjusted": 89200, "BayNum": 0, "DateUnadjusted": 20230722, "TripId": 4737552, "BlockId": 620751, "BlockNum": 605001, "LineGroup": 35902, "ServiceGroupId": 4, "StopFlag": 0, "StopTimesIndex": 3, "DestinationSign": "Orange to Martin Grove", "LastTripOfDayLineDir": "No", "LastTripOfDayPattern": "No", "SignId": 401, "LineDirId": 371021, "PatternId": 177936, "OriginalStopTime": 89200, "StopId": "723", "StopNum": 6, "StopPublicId": "9710", "StopLat": 43789170, "StopLon": -79548425, "IvrNum": 9710, "NodeId": 0, "NodeName": "", "StopName": "HWY 7 \/ WESTON", "StopAbbr": "9710", "LineName": "VIVA ORANGE", "LineAbbr": "605", "DirectionName": "WESTBOUND", "RealTime": 89200, "RealTimeSPC": 1083, "RealTimeMPC": 18, "LastUpdateThreshold": false, "AdherenceThreshold": false, "IgnoreAdherence": false, "VehicleNumber": "", "VehicleCapacity": 0, "EstimatedScheduleAdherence": 0, "TimeOutput": "12:46x", "SortValue": 89200, "OffRoute": false }, { "ETime": 90280, "ETimeSPC": 2163, "ETimeMPC": 36, "Date": 20230722, "ETimeUnadjusted": 90280, "BayNum": 0, "DateUnadjusted": 20230722, "TripId": 4737551, "BlockId": 620748, "BlockNum": 605004, "LineGroup": 35902, "ServiceGroupId": 4, "StopFlag": 0, "StopTimesIndex": 4, "DestinationSign": "Orange to Martin Grove", "LastTripOfDayLineDir": "No", "LastTripOfDayPattern": "No", "SignId": 401, "LineDirId": 371021, "PatternId": 177936, "OriginalStopTime": 90280, "StopId": "723", "StopNum": 6, "StopPublicId": "9710", "StopLat": 43789170, "StopLon": -79548425, "IvrNum": 9710, "NodeId": 0, "NodeName": "", "StopName": "HWY 7 \/ WESTON", "StopAbbr": "9710", "LineName": "VIVA ORANGE", "LineAbbr": "605", "DirectionName": "WESTBOUND", "RealTime": 90460, "RealTimeSPC": 2343, "RealTimeMPC": 39, "LastUpdateThreshold": false, "AdherenceThreshold": false, "IgnoreAdherence": false, "VehicleNumber": "", "VehicleCapacity": 0, "EstimatedScheduleAdherence": -180, "TimeOutput": " 1:07x", "SortValue": 90460, "OffRoute": false }, { "ETime": 91720, "ETimeSPC": 3603, "ETimeMPC": 60, "Date": 20230722, "ETimeUnadjusted": 91720, "BayNum": 0, "DateUnadjusted": 20230722, "TripId": 4737550, "BlockId": 620749, "BlockNum": 605005, "LineGroup": 35902, "ServiceGroupId": 4, "StopFlag": 0, "StopTimesIndex": 5, "DestinationSign": "Orange to Martin Grove", "LastTripOfDayLineDir": "Yes", "LastTripOfDayPattern": "Yes", "SignId": 401, "LineDirId": 371021, "PatternId": 177936, "OriginalStopTime": 91720, "StopId": "723", "StopNum": 6, "StopPublicId": "9710", "StopLat": 43789170, "StopLon": -79548425, "IvrNum": 9710, "NodeId": 0, "NodeName": "", "StopName": "HWY 7 \/ WESTON", "StopAbbr": "9710", "LineName": "VIVA ORANGE", "LineAbbr": "605", "DirectionName": "WESTBOUND", "RealTime": 91720, "RealTimeSPC": 3603, "RealTimeMPC": 60, "LastUpdateThreshold": false, "AdherenceThreshold": false, "IgnoreAdherence": false, "VehicleNumber": "", "VehicleCapacity": 0, "EstimatedScheduleAdherence": 0, "TimeOutput": " 1:28x", "SortValue": 91720, "OffRoute": false }, { "ETime": 29640, "ETimeSPC": 27923, "ETimeMPC": 465, "Date": 20230723, "ETimeUnadjusted": 29640, "BayNum": 0, "DateUnadjusted": 20230723, "TripId": 4735487, "BlockId": 620595, "BlockNum": 501001, "LineGroup": 35896, "ServiceGroupId": 5, "StopFlag": 0, "StopTimesIndex": 10, "DestinationSign": "RT 501 - BramptonTransit Züm - Hwy 7 • Queen to Downtown Brampton Terminal", "LastTripOfDayLineDir": "No", "LastTripOfDayPattern": "No", "SignId": 401, "LineDirId": 370941, "PatternId": 177909, "OriginalStopTime": 29640, "StopId": "723", "StopNum": 4, "StopPublicId": "9710", "StopLat": 43789170, "StopLon": -79548425, "IvrNum": 9710, "NodeId": 113, "NodeName": "WESTON \/ HWY 7", "StopName": "HWY 7 \/ WESTON", "StopAbbr": "9710", "LineName": "BRAMPTON TRANSIT Züm HWY 7 -QUEEN", "LineAbbr": "501", "DirectionName": "WESTBOUND", "IgnoreAdherence": true, "TimeOutput": " 8:14a(s)", "SortValue": 116040 }, { "ETime": 31380, "ETimeSPC": 29663, "ETimeMPC": 494, "Date": 20230723, "ETimeUnadjusted": 31380, "BayNum": 0, "DateUnadjusted": 20230723, "TripId": 4735486, "BlockId": 620596, "BlockNum": 501004, "LineGroup": 35896, "ServiceGroupId": 5, "StopFlag": 0, "StopTimesIndex": 12, "DestinationSign": "RT 501 - BramptonTransit Züm - Hwy 7 • Queen to Downtown Brampton Terminal", "LastTripOfDayLineDir": "No", "LastTripOfDayPattern": "No", "SignId": 401, "LineDirId": 370941, "PatternId": 177909, "OriginalStopTime": 31380, "StopId": "723", "StopNum": 4, "StopPublicId": "9710", "StopLat": 43789170, "StopLon": -79548425, "IvrNum": 9710, "NodeId": 113, "NodeName": "WESTON \/ HWY 7", "StopName": "HWY 7 \/ WESTON", "StopAbbr": "9710", "LineName": "BRAMPTON TRANSIT Züm HWY 7 -QUEEN", "LineAbbr": "501", "DirectionName": "WESTBOUND", "IgnoreAdherence": true, "TimeOutput": " 8:43a(s)", "SortValue": 117780 }, { "ETime": 33060, "ETimeSPC": 31343, "ETimeMPC": 522, "Date": 20230723, "ETimeUnadjusted": 33060, "BayNum": 0, "DateUnadjusted": 20230723, "TripId": 4735485, "BlockId": 620597, "BlockNum": 501002, "LineGroup": 35896, "ServiceGroupId": 5, "StopFlag": 0, "StopTimesIndex": 14, "DestinationSign": "RT 501 - BramptonTransit Züm - Hwy 7 • Queen to Downtown Brampton Terminal", "LastTripOfDayLineDir": "No", "LastTripOfDayPattern": "No", "SignId": 401, "LineDirId": 370941, "PatternId": 177909, "OriginalStopTime": 33060, "StopId": "723", "StopNum": 4, "StopPublicId": "9710", "StopLat": 43789170, "StopLon": -79548425, "IvrNum": 9710, "NodeId": 113, "NodeName": "WESTON \/ HWY 7", "StopName": "HWY 7 \/ WESTON", "StopAbbr": "9710", "LineName": "BRAMPTON TRANSIT Züm HWY 7 -QUEEN", "LineAbbr": "501", "DirectionName": "WESTBOUND", "IgnoreAdherence": true, "TimeOutput": " 9:11a(s)", "SortValue": 119460 }] }], "TripResult": [{ "Trips": [{ "Results": [{ "DeviceId": 135, "LastUpdateDate": 20230723, "LastUpdateTime": 1700, "EstimatedScheduleAdherence": 0, "BlockId": 620749, "LastStopName": "Helen", "LastTimingPointId": 9878, "LastTimingPointName": "Helen", "Lat": 43783136, "Lon": -79578016, "TripId": 4737478, "CurrentTime": 1717, "CurrentDate": 20230723, "ForeCastThreshold": 0, "LookupHints": "  12:00a " }], "Validation": [] }] }, { "Trips": [{ "Results": [{ "DeviceId": 142, "LastUpdateDate": 20230723, "LastUpdateTime": 1696, "EstimatedScheduleAdherence": -420, "BlockId": 620750, "LastStopName": "Commerce", "LastTimingPointId": 9877, "LastTimingPointName": "Commerce", "Lat": 43792000, "Lon": -79534880, "TripId": 4737553, "CurrentTime": 1717, "CurrentDate": 20230723, "ForeCastThreshold": 0, "LookupHints": "  12:07a " }], "Validation": [] }] }, { "Trips": [{ "Results": [{ "DeviceId": 138, "LastUpdateDate": 20230723, "LastUpdateTime": 1697, "EstimatedScheduleAdherence": 0, "BlockId": 620751, "LastStopName": "#9821 At Richmond Hill Ctr", "LastTimingPointId": 0, "LastTimingPointName": "#9821 At Richmond Hill Ctr", "Lat": 43830132, "Lon": -79450384, "TripId": 4737552, "CurrentTime": 1717, "CurrentDate": 20230723, "ForeCastThreshold": 0, "LookupHints": "  12:00a " }], "Validation": [] }] }, { "Trips": [{ "Results": [{ "DeviceId": 122, "LastUpdateDate": 20230723, "LastUpdateTime": 1675, "EstimatedScheduleAdherence": -180, "BlockId": 620748, "LastStopName": "Atkinson Avenue", "LastTimingPointId": 9721, "LastTimingPointName": "Atkinson Avenue", "Lat": 43822168, "Lon": -79452752, "TripId": 4737479, "CurrentTime": 1717, "CurrentDate": 20230723, "ForeCastThreshold": 0, "LookupHints": "  12:03a " }], "Validation": [] }] }, { "Trips": [{ "Results": [{ "DeviceId": 135, "LastUpdateDate": 20230723, "LastUpdateTime": 1700, "EstimatedScheduleAdherence": 0, "BlockId": 620749, "LastStopName": "Helen", "LastTimingPointId": 9878, "LastTimingPointName": "Helen", "Lat": 43783136, "Lon": -79578016, "TripId": 4737478, "CurrentTime": 1717, "CurrentDate": 20230723, "ForeCastThreshold": 0, "LookupHints": "  12:00a " }], "Validation": [] }] }], "RealTimeResults": [{ "RealTime": 89200, "RealTimeSPC": 1083, "RealTimeMPC": 18, "ETime": 89200, "ETimeSPC": 1083, "StopId": 723, "TripId": 4737552, "BlockId": 620751, "PatternId": 177936, "BayNum": 0, "EstimatedScheduleAdherence": 0, "LastTimingPointId": 0, "LastTimingPointName": "#9821 At Richmond Hill Ctr", "LastUpdateThreshold": false, "AdherenceThreshold": false, "IgnoreAdherence": false, "LineDirId": 371021, "Lon": -79450384, "Lat": 43830132, "VehicleNumber": "", "VehicleCapacity": 0, "RealTimeExtraBusEnabled": false, "OffRoute": false }, { "RealTime": 90460, "RealTimeSPC": 2343, "RealTimeMPC": 39, "ETime": 90280, "ETimeSPC": 2163, "StopId": 723, "TripId": 4737551, "BlockId": 620748, "PatternId": 177936, "BayNum": 0, "EstimatedScheduleAdherence": -180, "LastTimingPointId": 9721, "LastTimingPointName": "Atkinson Avenue", "LastUpdateThreshold": false, "AdherenceThreshold": false, "IgnoreAdherence": false, "LineDirId": 371021, "Lon": -79452752, "Lat": 43822168, "VehicleNumber": "", "VehicleCapacity": 0, "RealTimeExtraBusEnabled": false, "OffRoute": false }, { "RealTime": 91720, "RealTimeSPC": 3603, "RealTimeMPC": 60, "ETime": 91720, "ETimeSPC": 3603, "StopId": 723, "TripId": 4737550, "BlockId": 620749, "PatternId": 177936, "BayNum": 0, "EstimatedScheduleAdherence": 0, "LastTimingPointId": 9878, "LastTimingPointName": "Helen", "LastUpdateThreshold": false, "AdherenceThreshold": false, "IgnoreAdherence": false, "LineDirId": 371021, "Lon": -79578016, "Lat": 43783136, "VehicleNumber": "", "VehicleCapacity": 0, "RealTimeExtraBusEnabled": false, "OffRoute": false }, { "RealTime": 29640, "RealTimeSPC": 27923, "RealTimeMPC": 465, "ETime": 29640, "ETimeSPC": 27923, "StopId": 723, "TripId": 4735487, "BlockId": 0, "PatternId": 177909, "BayNum": 0, "EstimatedScheduleAdherence": 0, "LastTimingPointId": 0, "LastTimingPointName": "", "LastUpdateThreshold": false, "AdherenceThreshold": false, "IgnoreAdherence": true, "LineDirId": 370941, "Lon": 0, "Lat": 0, "VehicleNumber": "", "VehicleCapacity": -1, "RealTimeExtraBusEnabled": false, "OffRoute": false }, { "RealTime": 31380, "RealTimeSPC": 29663, "RealTimeMPC": 494, "ETime": 31380, "ETimeSPC": 29663, "StopId": 723, "TripId": 4735486, "BlockId": 0, "PatternId": 177909, "BayNum": 0, "EstimatedScheduleAdherence": 0, "LastTimingPointId": 0, "LastTimingPointName": "", "LastUpdateThreshold": false, "AdherenceThreshold": false, "IgnoreAdherence": true, "LineDirId": 370941, "Lon": 0, "Lat": 0, "VehicleNumber": "", "VehicleCapacity": -1, "RealTimeExtraBusEnabled": false, "OffRoute": false }, { "RealTime": 33060, "RealTimeSPC": 31343, "RealTimeMPC": 522, "ETime": 33060, "ETimeSPC": 31343, "StopId": 723, "TripId": 4735485, "BlockId": 0, "PatternId": 177909, "BayNum": 0, "EstimatedScheduleAdherence": 0, "LastTimingPointId": 0, "LastTimingPointName": "", "LastUpdateThreshold": false, "AdherenceThreshold": false, "IgnoreAdherence": true, "LineDirId": 370941, "Lon": 0, "Lat": 0, "VehicleNumber": "", "VehicleCapacity": -1, "RealTimeExtraBusEnabled": false, "OffRoute": false }], "BusTimeStatus": -1, "BusTimeCount": 2, "BusTimeSummary": "", "Validation": [{ "Name": "Service", "Instance": 1, "Type": "message", "Code": "CONTEXTOK", "Message": "Context successfully found for date 20230723:  SignUp=401, ServiceGroup=5 [ExcCombo=656]", "Action": "none" }], "SystemTime": "12:28a" }] }
      let response = {};
      await fetch(`https://tripplanner.yrt.ca/InfoWeb`, {
        signal: controller.signal,
        method: "POST",
        // mode: 'no-cors',
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json",
          Accept: "application/json text/plain, */*",
        },
        body: JSON.stringify({
          version: "1.1",
          method: "GetBusTimes",
          params: {
            LinesRequest: {
              Radius: -1,
              GetStopTimes: "1",
              GetStopTripInfo: "1",
              NumStopTimes: 150,
              SuppressLinesUnloadOnly: "1",
              Client: "MobileWeb",
              StopId: stopNum,
              EnableRealTime: true,
              NumTimesPerLine: 10,
            },
          },
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          response = json;
        });

      return response;
    };
    fetchEtaData().then((response) => {
      // console.log(response);
      setResponse(response);
    });
  }, []);

  useEffect(() => {
    if (
      response.result?.[0] &&
      response.result?.[0].Validation[0].Type !== "error"
    ) {
      const lineDirMap = new Map<number, any>();
      response.result?.[0].StopTimeResult[0].Lines.map((item) => {
        lineDirMap.set(item.LineDirId, item);
        return item;
      });

      setCountdownItems(
        response.result?.[0].RealTimeResults.map((item) => ({
          sec: item.RealTimeSPC,
          LineName: lineDirMap.get(item.LineDirId).LineName,
          LineAbbr: lineDirMap.get(item.LineDirId).LineAbbr,
        }))
      );
    }

    return () => {
      // second
    };
  }, [response.result]);

  if (response.result) {
    if (response.result?.[0].Validation[0].Type !== "error") {
      return (
        <main className={styles.yrt_main}>
          {response.result?.[0].RealTimeResults.length === 0 && (
            <Title2>Stop {params.stopId} has no real time results.</Title2>
          )}
          <Title2>{`YRT STOP ${params.stopId}`}</Title2>
          <Title2>
            {response.result?.[0].StopTimeResult[0].Lines[0].StopName}
          </Title2>
          <br />
          <Text>
            {response.result?.[0].StopTimeResult[0].Lines[0].DirectionName}
          </Text>
          <YRTCountdownItems items={countdownItems ?? []} />
        </main>
      );
    } else
      return (
        <main className={styles.yrt_main}>
          <Title2>Stop {params.stopId} has no results.</Title2>
          <Text>{response.result?.[0].Validation[0].Message}</Text>
        </main>
      );
  } else {
    return (
      <main className={styles.yrt_main}>
        <Title2>Stop {params.stopId} loading...</Title2>
      </main>
    );
  }
}

const YRTCountdownItems = (props: {
  items: { sec: number; LineName: string; LineAbbr: string }[];
}) => {
  const items = props.items;
  const CountdownRows = [];
  if (Array.isArray(items) && items.length)
    for (const i in items) {
      const item = items[i];
      CountdownRows.push(
        <li>
          <div className={styles.lineInfo}>
            <YRTBadge lineAbbr={item.LineAbbr} />
            <Text>{item.LineName}</Text>
          </div>
          <CountdownSec key={i} second={item.sec} />
        </li>
      );
    }
  return <ul>{CountdownRows}</ul>;
};
