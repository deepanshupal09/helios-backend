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

type SolarType = {
    date: string;
    total_power: number;
    day_name?: string;
}

type SolarCurrent = {
    email:string;
    timestamp: string;
    total_power: number;
}

type SolarResult = {
    solar_consumption: SolarType[];
    solar_production: SolarType[];
}

type currentResult = {
    grid_consumption: number;
    solar_consumption: number;
}

type TariffRates = {
    timestamp: string;
    rate: number;
}

type TariffResult = {
    actual_tariff: TariffRates[];
    forecast_tariff: TariffRates[];
}