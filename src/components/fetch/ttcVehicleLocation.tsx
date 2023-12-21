export const getVehicleLocation = async (vehicle: number) => {
    const response = await fetch(
        `https://webservices.umoiq.com/service/publicJSONFeed?command=vehicleLocation&a=ttc&v=${vehicle}`
    );
    const data = await response.json();
    if (data.Error) {
        return data
    }
    return {
        ...data,
        lon: parseFloat(data.lon),
        lat: parseFloat(data.lat)
    }
}