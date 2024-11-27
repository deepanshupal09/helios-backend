// src/models/consumption-models.ts
import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../config/db';

export class ConsumptionProvider extends Model {
  declare email: string;
  declare tariff_id: string;
  declare total_power?: number;
  declare submeter_1?: number;
  declare submeter_2?: number;
  declare submeter_3?: number;
}

ConsumptionProvider.init({
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  tariff_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  total_power: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  submeter_1: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  submeter_2: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  submeter_3: {
    type: DataTypes.DOUBLE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'ConsumptionProvider',
  tableName: 'consumption_provider',
  timestamps: false
});

export class ConsumptionSolar extends Model {
  declare email?: string;
  declare timestamp?: string;
  declare total_power?: number;
  declare submeter_1?: number;
  declare submeter_2?: number;
  declare submeter_3?: number;
  declare consumption_id: string;
}

ConsumptionSolar.init({
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  timestamp: {
    type: DataTypes.STRING,
    allowNull: true
  },
  total_power: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  submeter_1: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  submeter_2: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  submeter_3: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  consumption_id: {
    type: DataTypes.STRING,
    allowNull: true,
    primaryKey: true
  }
}, {
  sequelize,
  modelName: 'ConsumptionSolar',
  tableName: 'consumption_solar',
  timestamps: false
});