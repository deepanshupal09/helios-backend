// src/models/index.ts
import { Users } from './userModel';
import { ConsumptionProvider, ConsumptionSolar } from './consumptionModels';
import { SolarGenerated, Transaction } from './solarModel';
import { ProviderTariff, Providers } from './providersModel';

// Define associations
const setupAssociations = () => {
  // User Associations
  Users.hasMany(ConsumptionProvider, { 
    foreignKey: 'email',
    as: 'providerConsumptions'
  });
  ConsumptionProvider.belongsTo(Users, { 
    foreignKey: 'email',
    as: 'user'
  });

  Users.hasMany(ConsumptionSolar, { 
    foreignKey: 'email',
    as: 'solarConsumptions'
  });
  ConsumptionSolar.belongsTo(Users, { 
    foreignKey: 'email',
    as: 'user'
  });

  Users.hasMany(SolarGenerated, { 
    foreignKey: 'email',
    as: 'solarGenerations'
  });
  SolarGenerated.belongsTo(Users, { 
    foreignKey: 'email',
    as: 'user'
  });

  Users.hasMany(Transaction, { 
    foreignKey: 'email',
    as: 'transactions'
  });
  Transaction.belongsTo(Users, { 
    foreignKey: 'email',
    as: 'user'
  });

  // Provider Associations
  Providers.hasMany(ProviderTariff, { 
    foreignKey: 'provider_id',
    as: 'tariffs'
  });
  ProviderTariff.belongsTo(Providers, { 
    foreignKey: 'provider_id',
    as: 'associatedProvider' // Changed alias here
  });

  // ConsumptionProvider and ProviderTariff associations
  ConsumptionProvider.belongsTo(ProviderTariff, { 
    foreignKey: 'tariff_id',
    as: 'tariff'
  });
  ProviderTariff.hasMany(ConsumptionProvider, { 
    foreignKey: 'tariff_id',
    as: 'consumptionProviders'
  });

  // Fetch provider name using provider_id from ProviderTariff
  ProviderTariff.belongsTo(Providers, {
    foreignKey: 'provider_id', // Link the provider_id in ProviderTariff
    as: 'providerDetails' // Changed alias here as well
  });
  Providers.hasMany(ProviderTariff, {
    foreignKey: 'provider_id', // Link provider_id to ProviderTariff
    as: 'providerTariffs', // Alias to refer to associated tariffs
  });

  // SolarGenerated and ConsumptionSolar associations
  ConsumptionSolar.hasMany(SolarGenerated, { 
    foreignKey: 'consumption_id',
    as: 'solarGenerations'
  });
  SolarGenerated.belongsTo(ConsumptionSolar, { 
    foreignKey: 'consumption_id',
    as: 'consumptionSolar'
  });
};

// Initialize all models
const initializeModels = () => {
  setupAssociations();
  return {
    Users,
    Providers,
    ConsumptionProvider,
    ConsumptionSolar,
    SolarGenerated,
    Transaction,
    ProviderTariff
  };
};

export default initializeModels();
