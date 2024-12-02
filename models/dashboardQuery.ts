export const fetchGridConsumptions = `
    SELECT DATE(pt.timestamp) AS date, SUM(cp.total_power) AS total_power, SUM(cp.submeter_1) AS submeter_1, SUM(cp.submeter_2) AS submeter_2, SUM(cp.submeter_3) AS submeter_3
    FROM consumption_provider AS cp
    JOIN provider_tariff AS pt
    ON cp.tariff_id = pt.tariff_id
    WHERE cp.email = $1
    AND DATE(pt.timestamp) <= DATE($2) 
    AND DATE(pt.timestamp) >= (DATE($2) - INTERVAL '7 days')
    GROUP BY DATE(pt.timestamp)
    ORDER BY date;
`;

export const fetchSolarConsumptions = `
    SELECT 
    DATE(cs.timestamp) AS date, 
    SUM(cs.total_power) AS total_power, 
    SUM(cs.submeter_1) AS submeter_1, 
    SUM(cs.submeter_2) AS submeter_2, 
    SUM(cs.submeter_3) AS submeter_3
    FROM 
        consumption_solar AS cs
    WHERE 
        cs.email = $1
        AND DATE(cs.timestamp) <= DATE($2)
        AND DATE(cs.timestamp) >= (DATE($2) - INTERVAL '7 days')
    GROUP BY 
        DATE(cs.timestamp)
    ORDER BY 
        date;
`;

export const fetchForecastTariffRates = `
    WITH user_data AS (
        SELECT 
            u.provider_id::TEXT
        FROM 
            users u
        WHERE 
            u.email = $1
    ), 
    forecast_data AS (
        SELECT 
            TO_TIMESTAMP(ta.datetime, 'DD-MM-YYYY HH24:MI') AS datetime, 
            ta.forecast::DOUBLE PRECISION AS forecast_rate
        FROM 
            tariff_areva_fixed AS ta
        WHERE 
            TO_TIMESTAMP(ta.datetime, 'DD-MM-YYYY HH24:MI') > (CAST($2 AS TIMESTAMP) - INTERVAL '13 hours')
            AND TO_TIMESTAMP(ta.datetime, 'DD-MM-YYYY HH24:MI') <= (CAST($2 AS TIMESTAMP) + INTERVAL '3 hours')
            AND EXISTS (
                SELECT 1 
                FROM user_data ud
                WHERE ud.provider_id = '1'
            )
        UNION ALL
        SELECT 
            TO_TIMESTAMP(te.datetime, 'DD-MM-YYYY HH24:MI') AS datetime, 
            te.forecast::DOUBLE PRECISION AS forecast_rate
        FROM 
            tariff_euro_fixed AS te
        WHERE 
            TO_TIMESTAMP(te.datetime, 'DD-MM-YYYY HH24:MI') > (CAST($2 AS TIMESTAMP) - INTERVAL '13 hours')
            AND TO_TIMESTAMP(te.datetime, 'DD-MM-YYYY HH24:MI') <= (CAST($2 AS TIMESTAMP) + INTERVAL '3 hours')
            AND EXISTS (
                SELECT 1 
                FROM user_data ud
                WHERE ud.provider_id = '2'
            )
    )
    SELECT 
        fd.datetime, fd.forecast_rate
    FROM 
        forecast_data AS fd
`;

export const fetchActualTariffRates = `
    WITH user_data AS (
        SELECT 
            u.provider_id::TEXT
        FROM 
            users u
        WHERE 
            u.email = $1
    ), 
    actual_data AS (
        SELECT 
            timestamp, rate
        FROM 
            provider_tariff
        WHERE 
            timestamp >= (CAST($2 AS TIMESTAMP) - INTERVAL '12 hours')
            AND timestamp <= CAST($2 AS TIMESTAMP)
            AND EXISTS (
                SELECT 1 
                FROM user_data ud
                WHERE ud.provider_id = provider_tariff.provider_id::TEXT
            )
    )
    SELECT 
        timestamp, rate
    FROM 
        actual_data
`;

export const fetchSolarConsumedUsage = `
    SELECT 
    DATE(cs.timestamp) AS date, 
    SUM(cs.total_power) AS total_power 
    FROM 
        consumption_solar AS cs
    WHERE 
        cs.email = $1
        AND DATE(cs.timestamp) <= DATE($2)
        AND DATE(cs.timestamp) >= (DATE($2) - INTERVAL '10 days')
    GROUP BY 
        DATE(cs.timestamp)
    ORDER BY 
        date;
`;

export const fetchSolarProducedUsage = `
    SELECT 
    DATE(cs.timestamp) AS date, 
    SUM(cs.total_power) AS total_power
    FROM 
        solar_generated AS cs
    WHERE 
        cs.email = $1
        AND DATE(cs.timestamp) <= DATE($2)
        AND DATE(cs.timestamp) >= (DATE($2) - INTERVAL '10 days')
    GROUP BY 
        DATE(cs.timestamp)
    ORDER BY 
        date;
`;

export const fetchCurrentGridConsumption = `
    SELECT DATE(pt.timestamp) AS date, SUM(cp.total_power) AS total_power
    FROM consumption_provider AS cp
    JOIN provider_tariff AS pt
    ON cp.tariff_id = pt.tariff_id
    WHERE cp.email = $1
    AND DATE(pt.timestamp) = DATE($2) 
    GROUP BY DATE(pt.timestamp)
    ORDER BY date;
`;

export const fetchCurrentSolarConsumption = `
    SELECT 
    cs.email AS email,
    cs.timestamp AS timestamp,
    cs.total_power AS total_power
    FROM 
        consumption_solar AS cs
    WHERE 
        cs.email = $1
        AND DATE(cs.timestamp) = DATE($2)
    GROUP BY 
        cs.email, cs.timestamp, cs.total_power
    ORDER BY 
        cs.timestamp;
`;


export const fetchCurrentSavings = `
    SELECT pt.rate * $3 AS current_saving, pt.rate AS rate
    FROM 
        provider_tariff AS pt
    JOIN users AS u ON u.provider_id = pt.provider_id 
    WHERE 
        pt.timestamp = $2 AND u.email = $1;
`;

export const fetchSolarSold = `
    SELECT SUM(pt.total_power_sold) AS solar_energy_sold
    FROM 
        transaction AS pt
    WHERE 
        DATE(pt.timestamp) = DATE($2)
        AND pt.email = $1;
`;



