type GridConsumptionType = {
    timestamp: string;
    total_power: string;
    submeter_1: string;
    submeter_2: number;
    submeter_3: number;
}

type SolarConsumptionType = {
    timestamp: string;
    total_power: string;
    submeter_1: string;
    submeter_2: number;
    submeter_3: number;
}

type DailyConsumption = {
    total_consumption: number;
    submeter_1: number;
    submeter_2: number;
    submeter_3: number;
};

type ConsumptionResult = {
    grid_consumption: Record<string, DailyConsumption>;
    solar_consumption: Record<string, DailyConsumption>;
};