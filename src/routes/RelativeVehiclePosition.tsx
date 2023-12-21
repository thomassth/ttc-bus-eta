import { Suspense, useEffect, lazy } from "react";
import { Await, useParams } from "react-router-dom";
import { getVehicleLocation } from "../components/fetch/ttcVehicleLocation";
import { Title1 } from "@fluentui/react-components";

const VehicleLocation = lazy(() => import("../components/display/VehicleLocation"));

export default function RelativeVehiclePosition() {
    const params = useParams();
    const stopNum = parseInt(`${params.stopId}`);
    const vehicleId = parseInt(`${params.vehicle}`)
    // const [data, setData] = useState({})

    useEffect(() => {
        document.title = `Stop ID ${stopNum} | TTC arrivals`;
    });
    // useEffect(() => {
    //     getVehicleLocation(vehicleId).then(res => {
    //         setData(res)

    //     });
    // }, [])

    return (
        <main className="stopPredictionPage">
            <Title1>Route: {vehicleId}</Title1>

            <Suspense>
                <Await
                    resolve={getVehicleLocation(vehicleId)}
                    errorElement={
                        <div>Could not load vehicle data 😬</div>
                    }
                    // eslint-disable-next-line react/no-children-prop
                    children={(resolved) => (
                        <VehicleLocation stopId={stopNum} vehicleId={vehicleId} data={resolved} />
                    )}
                />
            </Suspense>
            {/* <Suspense>
                <VehicleLocation stopId={stopNum} vehicleId={vehicleId} data={data} />
            </Suspense> */}
        </main>
    );
}

