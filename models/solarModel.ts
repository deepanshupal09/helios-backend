import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../config/db';

// Solar Generated Model
export class SolarGenerated extends Model {
    declare email?: string;
    declare total_power?: number;
    declare solar_id: string;
    declare timestamp?: Date;
  }
  
  SolarGenerated.init({
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_power: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    solar_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'SolarGenerated',
    tableName: 'solar_generated',
    timestamps: false
  });
  
  export class Transaction extends Model {
    declare total_power_sold?: number;
    declare email: string;
    declare timestamp: Date;
  }
  
  Transaction.init({
    total_power_sold: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATEONLY,
      primaryKey: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transaction',
    timestamps: false
  });