import {
    Link as LinkFluent,
    Text,
    Title1,
} from "@fluentui/react-components";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SubwayAccordions } from "../accordions/SubwayAccordions";
import RawDisplay from "../rawDisplay/RawDisplay";
import { SubwayStations } from "../../models/ttc";

function RouteInfo(props: { line: number }): JSX.Element {
    const [data, setData] = useState<SubwayStations>();
    const [lineNum] = useState(props.line);
    const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(Date.now());
    const { t } = useTranslation();

    useEffect(() => {
        const controller = new AbortController();

        const fetchSubwayData = async () => {
            const response = await fetch(`https://www.ttc.ca/ttcapi/routedetail/get?id=${lineNum}`)
            const data = await response.text();
            return data
        }


        fetchSubwayData().then(res => {
            try {
                setData(JSON.parse(res));

            } catch (error) {
                setData({ routeBranchesWithStops: [], Error: true })

            }
        })

        // when useEffect is called, the following clean-up fn will run first
        return () => {
            controller.abort();
        };
    }, [lastUpdatedAt]);

    const handleFetchBusClick = useCallback(() => {
        setLastUpdatedAt(Date.now());
        setData(undefined);
    }, [lastUpdatedAt]);

    if (data !== undefined) {
        if (!data.Error) {

            const accordionList: JSX.Element[] = data.routeBranchesWithStops.filter((element) => element.routeBranch.headsign).map(
                (element) => {
                    return (
                        <li key={element.routeBranch.gtfsId}>
                            <SubwayAccordions
                                title={filterSubwayDirection(element.routeBranch.headsign)}
                                lineNum={props.line}
                                result={element.routeBranchStops}
                                tag={element.routeBranch.gtfsId}
                            />
                        </li>
                    );
                }
            );

            return (
                <div className="stopsListContainer">
                    <Title1>{filterSubwayTitle(data.routeBranchesWithStops[0].routeBranch.headsign)}</Title1>
                    <ul>
                        {accordionList}
                        <li>
                            <RawDisplay data={data} />
                        </li>
                    </ul>
                </div>
            );
        } else return (<div className="stopsListContainer">
            <ul>
                {props.line === 3 && <li>Line 3 has ceased to be.</li>}
                <li>
                    <RawDisplay data={data} />
                </li>
            </ul>
        </div>)

    } else {
        if (navigator.onLine) {
            return (
                <LinkFluent appearance="subtle" onClick={handleFetchBusClick}>
                    <Text as="h1" weight="semibold">
                        {t("reminder.loading")}
                    </Text>
                </LinkFluent>
            );
        } else {
            return (
                <Text>
                    Your device seems to be offline, and no cache has been found.
                </Text>
            );
        }
    }
}
export default RouteInfo;

const filterSubwayDirection = (input: string) => {
    return input.replace(/LINE \d \([\w-]+\) /, '')
}

const filterSubwayTitle = (input: string) => {
    return input.split(/\(|\)/)[1]
}