import { useEffect, useState } from "react"
import { addStops, getSize } from "../../store/ttcRouteDb.js"
import NearbyList from "./nearby-list.js"
import { Button } from "@fluentui/react-components"


export default function Nearby() {
    const [number, useNumber] = useState<number>(-1)
    const [isLoading, setIsLoading] = useState<Boolean>(false)
    const [date, useDate] = useState<Date>()

    useEffect(()=>{
      getSize().then((result)=>{
        useNumber(result)
      })
    })

    const handleRefresh = async () => {
        setIsLoading(true)

        const response = await fetch('https://thomassth.github.io/to-bus-stations/data/ttc/stops.json')
        const data = await response.json()

        addStops(data).then(()=>{
            setIsLoading(false)
            getSize().then((result)=>{
                useNumber(result)
              })
        })
    }


    return (
        <div>
            There is {number} data in the stops database.
            <Button onClick={handleRefresh}>{isLoading ? 'reloading...' : 'Refresh database'}</Button>
            <NearbyList/>
        </div>
    )
}