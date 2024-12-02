import { fetchActualTariffRatesModel, fetchForeCastTariffRatesModel, fetchGridConsumptionsModel, fetchSolarConsumedUsageModel, fetchSolarConsumptionsModel, fetchSolarProducedUsageModel} from '../models/dashboardModel';

export const fetchConsumptionService = async (email: string, currentTimestamp: string): Promise<ConsumptionResult> => {
    try {
        const gridData: DailyConsumption[] = await fetchGridConsumptionsModel(email, currentTimestamp);
        const solarData: DailyConsumption[] = await fetchSolarConsumptionsModel(email, currentTimestamp);

        const updatedGridData = gridData.map((item) => {
            const currentDate = new Date(item.date);
            const dayName = currentDate.toLocaleDateString('en-IN', { weekday: 'long' });
            currentDate.setDate(currentDate.getDate() + 1); 
            return { ...item, date: currentDate.toISOString().split('T')[0], day_name: dayName }; 
        });
        
        const updatedSolarData = solarData.map((item) => {
            const currentDate = new Date(item.date);
            const dayName = currentDate.toLocaleDateString('en-IN', { weekday: 'long' }); 
            currentDate.setDate(currentDate.getDate() + 1); 
            return { ...item, date: currentDate.toISOString().split('T')[0], day_name: dayName };
        });

        return { grid_consumption: updatedGridData, solar_consumption: updatedSolarData };
    } catch (error) {
        console.error('Error fetching consumption data: ', error);
        throw error;
    }
};


export const fetchSolarUsageService = async (email: string, currentTimestamp: string): Promise<SolarResult> => {
    try {
        const solarConsumed: SolarType[] = await fetchSolarConsumedUsageModel(email, currentTimestamp);
        const solarProduced: SolarType[] = await fetchSolarProducedUsageModel(email, currentTimestamp);

        const updatedConsumed = solarConsumed.map((item) => {
            const currentDate = new Date(item.date);
            const dayName = currentDate.toLocaleDateString('en-IN', { weekday: 'long' }); 
            currentDate.setDate(currentDate.getDate() + 1); 
            return { ...item, date: currentDate.toISOString().split('T')[0], day_name: dayName }; 
        });
        
        const updatedProduced = solarProduced.map((item) => {
            const currentDate = new Date(item.date);
            const dayName = currentDate.toLocaleDateString('en-IN', { weekday: 'long' });
            currentDate.setDate(currentDate.getDate() + 1); 
            return { ...item, date: currentDate.toISOString().split('T')[0], day_name: dayName }; 
        });
        
        return { solar_consumption: updatedConsumed, solar_production: updatedProduced };
    } catch (error) {
        console.error('Error fetching consumption data: ', error);
        throw error;
    }
};

export const fetchTariffRatesService = async (email:string, currentTimestamp: string): Promise<TariffResult> => {
    try{
        const actualTariffData: TariffRates[] = await fetchActualTariffRatesModel(email, currentTimestamp);
        const forecastTariffData: TariffRates[] = await fetchForeCastTariffRatesModel(email, currentTimestamp);
        return { actual_tariff: actualTariffData, forecast_tariff: forecastTariffData };
    }catch(error){
        console.error('Error fetching tariff data: ', error);
        throw error;
    }
}
