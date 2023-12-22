export const getVehicleLocation = async (vehicle: number) => {
  const response = await fetch(
    `https://webservices.umoiq.com/service/publicJSONFeed?command=vehicleLocation&a=ttc&v=${vehicle}`
  );
  const data = await response.json();
  if (data.Error) {
    return data;
  }

  data.vehicle.lon = parseFloat(data.vehicle?.lon);
  data.vehicle.lat = parseFloat(data.vehicle?.lat);
  return data;
};
