
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