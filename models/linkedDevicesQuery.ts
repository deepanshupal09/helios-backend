export const fetchForecastConsumption = `
    WITH tariff_timestamps AS (
        SELECT 
            pt."timestamp"
        FROM 
            provider_tariff AS pt
        JOIN 
            consumption_provider AS cp
        ON 
            pt.tariff_id = cp.tariff_id
        WHERE 
            cp.email = $1
            AND DATE(pt."timestamp") = DATE(CAST($2 AS TIMESTAMP))
    ),
    forecast_data AS (
        SELECT 
            TO_TIMESTAMP(pf.datetime, 'DD-MM-YYY HH24:MI') AS datetime,
            pf.forecast::DOUBLE PRECISION AS forecast_consumption
        FROM 
            power_forecast_fixed AS pf
        WHERE 
            TO_TIMESTAMP(pf.datetime, 'DD-MM-YYYY HH24:MI') >= (SELECT MAX("timestamp") - INTERVAL '12 hours' FROM tariff_timestamps)
            AND TO_TIMESTAMP(pf.datetime, 'DD-MM-YYYY HH24:MI') <= (SELECT MAX("timestamp") + INTERVAL '3 hours' FROM tariff_timestamps)
    )
    SELECT 
        fd.datetime,
        fd.forecast_consumption
    FROM 
        forecast_data AS fd;
`;



export const fetchActualConsumption = `
    WITH tariff_timestamps AS (
        SELECT 
            pt."timestamp"
        FROM 
            provider_tariff AS pt
        JOIN 
            consumption_provider AS cp
        ON 
            pt.tariff_id = cp.tariff_id
        WHERE 
            cp.email = $1
            AND DATE(pt."timestamp") = DATE(CAST($2 AS TIMESTAMP))
    ),
    actual_data AS (
        SELECT 
            pt."timestamp", 
            cp.total_power
        FROM 
            consumption_provider AS cp
        JOIN 
            provider_tariff AS pt
        ON 
            pt.tariff_id = cp.tariff_id
        WHERE 
            pt."timestamp" >= (SELECT MAX("timestamp") - INTERVAL '12 hours' FROM tariff_timestamps)
            AND pt."timestamp" <= (SELECT MAX("timestamp") FROM tariff_timestamps)
    )
    SELECT 
        ad."timestamp", 
        ad.total_power
    FROM 
        actual_data AS ad;
`;
