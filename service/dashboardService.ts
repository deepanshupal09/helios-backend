import { pool } from '../config/db';
import { fetchActualTariffRatesModel, fetchCurrentGridModel, fetchCurrentSavingsModel, fetchCurrentSolarModel, fetchForeCastTariffRatesModel, fetchGridConsumptionsModel, fetchLinkedDeviceConsumptionModel, fetchSolarConsumedUsageModel, fetchSolarConsumptionsModel, fetchSolarProducedUsageModel, fetchSolarSoldModel} from '../models/dashboardModel';

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

export const fetchCurrentData = async (
    email: string,
    currentTimestamp: string
): Promise<currentResult & { total_savings: number; solar_energy_sold: number | null }> => {
    try {
        const currentGrid: SolarType[] = await fetchCurrentGridModel(email, currentTimestamp);
        const currentSolar: SolarCurrent[] = await fetchCurrentSolarModel(email, currentTimestamp);

        const solarSavingsPromises = currentSolar.map(async (item) => {
            const savings = await fetchCurrentSavingsModel(item.email, item.timestamp, item.total_power);
            return {
                ...item,
                savings: savings.length > 0 ? savings[0].current_saving : 0,
            };
        });

        // Fetch solar energy sold
        const solarSold = await fetchSolarSoldModel(email, currentTimestamp);
        const solarEnergySold = solarSold.length > 0 ? solarSold[0].solar_energy_sold : null;

        const solarConsumptionWithSavings = await Promise.all(solarSavingsPromises);
        const totalSavings = solarConsumptionWithSavings.reduce((acc, item) => acc + item.savings, 0);
        const currentSolarConsumption = currentSolar.reduce((acc, item) => acc + item.total_power, 0);
        const currentGridConsumption = currentGrid.reduce((acc, item) => acc + item.total_power, 0);

        return {
            grid_consumption: currentGridConsumption,
            solar_consumption: currentSolarConsumption,
            total_savings: totalSavings,
            solar_energy_sold: solarEnergySold
        };
    } catch (error) {
        console.error('Error fetching tariff data: ', error);
        throw error;
    }
};


export async function fetchLinkedDeviceConsumptionService (date: Date, email: string) {
    try {
      const res = await fetchLinkedDeviceConsumptionModel(date, email);
      return res;
    } catch(error) {
      console.log("Error fetching linked Device Consumption: ", error);
      throw new Error("Something went wrong! Please try again later.");
    }
  }