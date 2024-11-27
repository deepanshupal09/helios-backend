import models from "../models"; // Import models from your index.ts
import { Providers, ProviderTariff } from "../models/providersModel";

const { Users, ConsumptionProvider, ConsumptionSolar } = models;

export async function fetchConsumptionService(email: string) {
  try {
    // Find user by email and include consumption data
    const user = await Users.findAll({
      where: { email },
      include: [
        {
          model: ConsumptionProvider,
          as: "providerConsumptions", // Use the correct alias for providerConsumptions
          include: [
            {
              model: ProviderTariff,
              as: "tariff", // Use the correct alias for ProviderTariff here
              include: [
                {
                  model: Providers,
                  as: "associatedProvider", // This is correct alias from your associations
                  attributes: ["name"] // Fetch the provider name
                }
              ]
            }
          ]
        },
        {
          model: ConsumptionSolar,
          as: "solarConsumptions", // Correct alias for solarConsumptions
        },
      ],
    });

    if (!user) {
      return { message: `No user found with email: ${email}` };
    }

    // Extract consumptions from the user data
    return { userData: user };
  } catch (error) {
    console.error(`Error fetching consumption data for email ${email}:`, error);
    throw error;
  }
}
