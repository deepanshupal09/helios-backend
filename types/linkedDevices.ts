
type Consumption1Type = {
    timestamp: string;
    consumption: number;
}

type Consumption2Type = {
    datetime: string;
    consumption: number;
}

type ConsumptionData = {
    actual_consumption: Consumption1Type[];
    forecast_consumption: Consumption2Type[];
}