export const fetchSolarProductionQuery = `SELECT timestamp, total_power
FROM public.solar_generated 
WHERE email = $1
AND "timestamp" >= ($2::timestamp - INTERVAL '24 hours')
AND "timestamp" <= $2::timestamp
ORDER BY "timestamp" ASC;
`
export const fetchSolarProductionWeekQuery = `SELECT timestamp, total_power
FROM public.solar_generated 
WHERE email = $1
AND "timestamp" >= ($2::timestamp - INTERVAL '7 days')
AND "timestamp" <= $2::timestamp
ORDER BY "timestamp" ASC;
`

export const fetchSolarIrradiationQuery = `SELECT * FROM solar_irradiance_data 
WHERE timestamp <= ($1::timestamp + INTERVAL '3 hours')
AND timestamp > $1::timestamp
ORDER BY timestamp ASC;
`

export const fetchSolarIrradiationWeekQuery = `SELECT * FROM solar_irradiance_data 
WHERE timestamp <= ($1::timestamp + INTERVAL '2 days')
AND timestamp > $1::timestamp
ORDER BY timestamp ASC;
`

