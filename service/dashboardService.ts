import { fetchGridConsumptionsModel, fetchSolarConsumptionsModel } from '../models/dashboardModel';

export const fetchConsumptionService = async (email: string, currentTimestamp: string): Promise<ConsumptionResult> => {
    try {
        const gridData: DailyConsumption[] = await fetchGridConsumptionsModel(email, currentTimestamp);
        const solarData: DailyConsumption[] = await fetchSolarConsumptionsModel(email, currentTimestamp);

        const updatedGridData = gridData.map((item) => {
            const date = new Date(item.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            return { ...item, day_name: dayName };
        });

        const updatedSolarData = solarData.map((item) => {
            const date = new Date(item.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            return { ...item, day_name: dayName };
        });

        return { grid_consumption: updatedGridData, solar_consumption: updatedSolarData };
    } catch (error) {
        console.error('Error fetching consumption data: ', error);
        throw error;
    }
};

