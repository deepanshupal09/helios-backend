export const fetchSolarProductionQuery = `SELECT timestamp, total_power
FROM public.solar_generated 
WHERE email = $1
AND "timestamp" >= ($2::timestamp - INTERVAL '12 hours')
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

export const putTransactionQuery = `INSERT INTO transaction (total_power_sold, timestamp, transaction_id, email) values ($1, $2, $3, $4);`

export const fetchEnergyYieldQuery = `
WITH date_range AS (
    SELECT generate_series(
        date_trunc('day', $1::timestamp) - interval '7 days',
        date_trunc('day', $1::timestamp) - interval '1 day',
        '1 day'
    ) AS day
),
sold_per_day AS (
    SELECT 
        date_trunc('day', "timestamp") AS day,
        SUM(total_power_sold) AS total_sold
    FROM 
        public.transaction
    WHERE 
        "timestamp" >= (date_trunc('day', $1::timestamp) - interval '7 days') 
        AND "timestamp" < date_trunc('day', $1::timestamp)
        AND email = $2
    GROUP BY date_trunc('day', "timestamp")
),
consumed_per_day AS (
    SELECT 
        date_trunc('day', "timestamp") AS day,
        SUM(total_power) AS total_consumed
    FROM 
        public.consumption_solar
    WHERE 
        "timestamp" >= (date_trunc('day', $1::timestamp) - interval '7 days') 
        AND "timestamp" < date_trunc('day', $1::timestamp)
        AND email = $2
    GROUP BY date_trunc('day', "timestamp")
)
SELECT 
    dr.day,
    COALESCE(spd.total_sold, 0) AS energy_sold,
    COALESCE(cpd.total_consumed, 0) AS energy_consumed
FROM 
    date_range dr
LEFT JOIN 
    sold_per_day spd
ON 
    dr.day = spd.day
LEFT JOIN 
    consumed_per_day cpd
ON 
    dr.day = cpd.day
ORDER BY 
    dr.day;
`

export const updateStatusQuery = `UPDATE users SET status = $1 WHERE email = $2;`

