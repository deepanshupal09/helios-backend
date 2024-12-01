export const fetchGridConsumptions = `
    SELECT DATE(pt.timestamp) AS date, SUM(cp.total_power) AS total_power, SUM(cp.submeter_1) AS submeter_1, SUM(cp.submeter_2) AS submeter_2, SUM(cp.submeter_3) AS submeter_3
    FROM consumption_provider AS cp
    JOIN provider_tariff AS pt
    ON cp.tariff_id = pt.tariff_id
    WHERE cp.email = $1
    AND DATE(pt.timestamp) > $2
    GROUP BY DATE(pt.timestamp)
    ORDER BY date;
`;

export const fetchSolarConsumptions = `
    SELECT DATE(cs.timestamp) AS date, SUM(cs.total_power) AS total_power, SUM(cs.submeter_1) AS submeter_1, SUM(cs.submeter_2) AS submeter_2, SUM(cs.submeter_3) AS submeter_3
    FROM consumption_solar AS cs
    WHERE cs.email = $1
    AND DATE(cs.timestamp) > $2
    GROUP BY DATE(cs.timestamp)
    ORDER BY date;
`;

