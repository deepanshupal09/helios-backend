import {
  fetchSolarIrradianceModel,
  fetchSolarIrradianceWeekModel,
  fetchSolarProductionModel,
  fetchSolarProductionWeekModel,
} from "../models/solarModel";
import dotenv from "dotenv";

dotenv.config();

export async function fetchSolarProductionService(email: string, date: Date, type: string) {
  try {
    if (type === "day") {
      const solarData = await fetchSolarProductionModel(email, date);
      const solarIrradianceData = await fetchSolarIrradianceModel(date);

      // Fetching forecast weather data
      const res = await fetch(
        `https://pro.openweathermap.org/data/2.5/forecast?q=Delhi,India&APPID=${process.env.OPEN_WEATHER_API_KEY}`
      );
      const weatherData = await res.json();

      // console.log("solar Data: ", solarIrradianceData);
      // console.log("weather Data: ", weatherData);

      // Get the closest hourly weather forecast

      const transformedData = solarIrradianceData.map((dataPoint) => {
        const currDate = new Date(dataPoint.timestamp);
        const closestWeather = getClosestWeatherData(weatherData.list, currDate);

        // console.log("currDate: ", currDate);
        const windSpeed = closestWeather.wind.speed; // Wind speed from closest weather data
        const sunshine = parseFloat(dataPoint.dni); // This may need to be calculated or sourced from another value
        const radiation = parseFloat(dataPoint.ghi); // Radiation (GHI) from solar data
        const airTemperature = closestWeather.main.temp - 273.15; // Convert from Kelvin to Celsius
        const relativeAirHumidity = closestWeather.main.humidity;
        const hour = currDate.getHours();
        const dayOfWeek = currDate.getDay(); // Sunday - Saturday : 0 - 6
        const quarter = Math.floor((currDate.getMonth() + 3) / 3); // Calculate quarter
        const month = currDate.getMonth() + 1; // Get the month (1-12)
        const dayOfMonth = currDate.getDate(); // Day of the month
        const dayOfYear = Math.floor((currDate.getTime() - new Date(currDate.getFullYear(), 0, 0).getTime()) / 86400000); // Day of the year
        const weekOfYear = Math.ceil(dayOfYear / 7); // Week of the year
        const year = currDate.getFullYear();

        // Returning an array in the exact sequence
        return [
          windSpeed, // WindSpeed
          sunshine, // Sunshine
          radiation, // Radiation
          airTemperature, // Air Temperature
          relativeAirHumidity, // RelativeAirHumidity
          hour, // hour
          dayOfWeek, // day_of_week
          quarter, // quarter
          month, // month
          dayOfMonth, // day_of_month
          dayOfYear, // day_of_year
          weekOfYear, // week_of_year
          year, // year
        ];
      });

      // console.log("transformed data: ", transformedData);
      const apiCalls = transformedData.map((data) =>
        fetch(`${process.env.MODEL_API_URL}/predict`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ parameters: data }), // Send each transformed data as a parameter
        })
      );

      // Wait for all API calls to complete and collect the results
      const responses = await Promise.all(apiCalls);

      // Parse the responses and store the results in an array
      const results = await Promise.all(responses.map((res) => res.json()));
      results.map((result) => {
        if (result.prediction < 67) result.prediction = 0;
        else if (result.prediction > 600) result.prediction /= 4;
      });
      for (let i = 0; i < 3; i++) {
        solarData.push({ timestamp: solarIrradianceData[i].timestamp, total_power: results[i].prediction });
      }

      // console.log("API Results: ", results);

      return solarData;
    } else if (type === "week") {
      const solarData = await fetchSolarProductionWeekModel(email, date);
      const solarIrradianceData = await fetchSolarIrradianceWeekModel(date);

      // Fetching forecast weather data
      const res = await fetch(
        `https://pro.openweathermap.org/data/2.5/forecast?q=Sceaux,France&APPID=${process.env.OPEN_WEATHER_API_KEY}`
      );
      const weatherData = await res.json();

      console.log("solar Data: ", solarIrradianceData);
      // console.log("weather Data: ", weatherData);

      // Get the closest hourly weather forecast

      const transformedData = solarIrradianceData.map((dataPoint) => {
        const currDate = new Date(dataPoint.timestamp);
        const closestWeather = getClosestWeatherData(weatherData.list, currDate);

        // console.log("currDate: ", currDate);
        const windSpeed = closestWeather.wind.speed; // Wind speed from closest weather data
        const sunshine = parseFloat(dataPoint.dni); // This may need to be calculated or sourced from another value
        const radiation = parseFloat(dataPoint.ghi); // Radiation (GHI) from solar data
        const airTemperature = closestWeather.main.temp - 273.15; // Convert from Kelvin to Celsius
        const relativeAirHumidity = closestWeather.main.humidity;
        const hour = currDate.getHours();
        const dayOfWeek = currDate.getDay(); // Sunday - Saturday : 0 - 6
        const quarter = Math.floor((currDate.getMonth() + 3) / 3); // Calculate quarter
        const month = currDate.getMonth() + 1; // Get the month (1-12)
        const dayOfMonth = currDate.getDate(); // Day of the month
        const dayOfYear = Math.floor((currDate.getTime() - new Date(currDate.getFullYear(), 0, 0).getTime()) / 86400000); // Day of the year
        const weekOfYear = Math.ceil(dayOfYear / 7); // Week of the year
        const year = currDate.getFullYear();

        // Returning an array in the exact sequence
        return [
          windSpeed, // WindSpeed
          sunshine, // Sunshine
          radiation, // Radiation
          airTemperature, // Air Temperature
          relativeAirHumidity, // RelativeAirHumidity
          hour, // hour
          dayOfWeek, // day_of_week
          quarter, // quarter
          month, // month
          dayOfMonth, // day_of_month
          dayOfYear, // day_of_year
          weekOfYear, // week_of_year
          year, // year
        ];
      });

      // console.log("transformed data: ", transformedData);
      const apiCalls = transformedData.map((data) =>
        fetch(`${process.env.MODEL_API_URL}/predict`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ parameters: data }), // Send each transformed data as a parameter
        })
      );

      // Wait for all API calls to complete and collect the results
      const responses = await Promise.all(apiCalls);

      // Parse the responses and store the results in an array
      const results = await Promise.all(responses.map((res) => res.json()));
      results.map((result) => {
        if (result.prediction < 67) result.prediction = 0;
      });

      for (let i = 0; i < 46; i++) {
        solarData.push({ timestamp: solarIrradianceData[i].timestamp, total_power: results[i].prediction });
      }

      // console.log("API Results: ", results);
      const aggregateData = aggregateDailyPower(solarData);
      aggregateData.map((data) => {
        if (data.total_power > 4000) data.total_power /= 6;
      })
      // console.log("Aggregating: ", aggregateData);

      return aggregateData;
    } else {
      return {message: "Invalid argument"}
    }
  } catch (error) {
    console.log("Error fetching Solar Production: ", error);
    return { message: "Something went wrong! Please try again later." };
  }
}

function aggregateDailyPower(data: { timestamp: Date; total_power: number }[]) {
  const dailyData: Record<string, number> = {}; // Use Record to define a string-to-number map

  data.forEach(({ timestamp, total_power }) => {
    const date = new Date(timestamp).toISOString().split("T")[0]; // Extract date in 'YYYY-MM-DD' format
    if (!dailyData[date]) {
      dailyData[date] = 0; // Initialize total_power for the day
    }
    dailyData[date] += total_power; // Accumulate the total power
  });

  // Convert the aggregated data into an array format
  return Object.entries(dailyData).map(([date, total_power]) => ({
    date,
    total_power,
  }));
}


// Helper function to find the closest weather data
function getClosestWeatherData(forecast: any[], targetDate: Date) {
  let closest = forecast[0];
  let minDiff = Math.abs(new Date(forecast[0].dt * 1000).getTime() - targetDate.getTime());

  forecast.forEach((data) => {
    const forecastDate = new Date(data.dt * 1000);
    const diff = Math.abs(forecastDate.getTime() - targetDate.getTime());

    if (diff < minDiff) {
      minDiff = diff;
      closest = data;
    }
  });

  return closest;
}
