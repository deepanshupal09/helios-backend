import { fetchgGridConsumptionsModel, fetchgSolarConsumptionsModel } from '../models/dashboardModel';
import { format, parse, differenceInCalendarDays } from 'date-fns';

const calculateDailyConsumption = (data: (GridConsumptionType | SolarConsumptionType)[]): Record<string, DailyConsumption> => {
    const groupedData: Record<string, DailyConsumption> = {};

    data.forEach(entry => {
        const entryDate = new Date(entry.timestamp);
        const day = format(entryDate, 'dd-MM-yyyy (EEEE)');

        if (!groupedData[day]) {
            groupedData[day] = {
                total_consumption: 0,
                submeter_1: 0,
                submeter_2: 0,
                submeter_3: 0
            };
        }

        groupedData[day].total_consumption += Number(entry.total_power || 0);
        groupedData[day].submeter_1 += Number(entry.submeter_1 || 0);
        groupedData[day].submeter_2 += Number(entry.submeter_2 || 0);
        groupedData[day].submeter_3 += Number(entry.submeter_3 || 0);
    });

    return groupedData;
};

export const fetchConsumptionService = async (email: string, currentTimestamp: string): Promise<ConsumptionResult> => {
    try {
        const parsedCurrentDate = parse(currentTimestamp, 'dd-MM-yyyy HH:mm', new Date());
        const gridData: GridConsumptionType[] = await fetchgGridConsumptionsModel(email);
        const solarData: SolarConsumptionType[] = await fetchgSolarConsumptionsModel(email);

        // Filter the data for the last 8 days
        const filterLastEightDays = (data: (GridConsumptionType | SolarConsumptionType)[]) => {
            return data.filter(entry => {
                const entryDate = new Date(entry.timestamp);
                const daysDiff = differenceInCalendarDays(parsedCurrentDate, entryDate);
                return daysDiff >= 0 && daysDiff < 8;
            });
        };

        const filteredGridData = filterLastEightDays(gridData);
        const filteredSolarData = filterLastEightDays(solarData);

        const gridConsumption = calculateDailyConsumption(filteredGridData);
        const solarConsumption = calculateDailyConsumption(filteredSolarData);

        return { grid_consumption: gridConsumption, solar_consumption: solarConsumption };
    } catch (error) {
        console.error('Error fetching consumption data: ', error);
        throw error;
    }
};
