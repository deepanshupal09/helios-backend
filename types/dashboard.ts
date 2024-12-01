type DailyConsumption = {
    date: string;
    total_power: number;
    submeter_1: number;
    submeter_2: number;
    submeter_3: number;
    day_name?: string;
};

type ConsumptionResult = {
    grid_consumption: DailyConsumption[];
    solar_consumption: DailyConsumption[];
};

type TariffRates = {
    timestamp: string;
    rate: number;
}

type TariffResult = {
    actual_tariff: TariffRates[];
    forecast_tariff: TariffRates[];
}