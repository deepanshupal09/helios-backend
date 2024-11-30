export const fetchGridConsumptions = `
    SELECT pt.timestamp ,cp.total_power, cp.submeter_1, cp.submeter_2, cp.submeter_3
    FROM consumption_provider AS cp 
    JOIN provider_tariff AS pt
    ON cp.tariff_id = pt.tariff_id
    WHERE cp.email=$1
`;

export const fetchSolarConsumptions = `
    SELECT cs.timestamp ,cs.total_power, cs.submeter_1, cs.submeter_2, cs.submeter_3
    FROM consumption_solar AS cs
    WHERE cs.email=$1
`;

