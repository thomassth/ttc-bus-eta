import { Title2, Title1, Text } from "@fluentui/react-components";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { useState, useEffect } from "react";
import { RMap, ROSMWebGL, RLayerVector, RFeature } from "rlayers";
import { RView } from "rlayers/RMap";
import "ol/ol.css";
import { parsedVehicleLocation } from "../../models/ttc";



export default function VehicleLocation(props: { stopId?: number, vehicleId?: number, data: parsedVehicleLocation }) {

    const [data, setData] = useState<parsedVehicleLocation>({})
    const [error, setError] = useState(false)
    const [center, setCenter] = useState([-8827495.913945649, 5436686.505484939])
    const [view, setView] = useState<RView>({ center, zoom: 16 });



    useEffect(() => {
        if (data && data.vehicle) {
            const latlong = fromLonLat([data.vehicle?.lon, data.vehicle?.lat])
            setCenter(latlong)
            setView({ center: latlong, zoom: 16 })
        }
    }, [data])

    useEffect(() => {
        if (props.data?.Error) {
            setError(true)
        }
        setData(props.data)
        if (data.vehicle) {
            const center =

                fromLonLat([data.vehicle?.lon, data.vehicle?.lat])
            setView({ center, zoom: 16 })
        }
    }, []);


    if (error) {
        return (<main>
            <Title2>Error: {data.Error?.content}</Title2>
        </main>)
    }

    return (
        <main>
            <RMap width={"100%"} height={"60vh"} initial={{ center, zoom: 11 }} view={[view, setView]}>
                <ROSMWebGL />
                <RLayerVector zIndex={10}>
                    <RFeature geometry={new Point(center)} />
                </RLayerVector>
            </RMap>
            <Title1>Route: {data.vehicle?.routeTag}</Title1>

            <Title2>Bus ID: {data.vehicle?.id}</Title2>

            <Text>Speed: {data.vehicle?.speedKmHr}km/h</Text>
        </main>)

}