import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export class Providers extends Model {
  declare provider_id: string;
  declare name?: string;
  declare last_modified?: string;
}

Providers.init(
  {
    provider_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_modified: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Providers",
    tableName: "providers",
    timestamps: false,
  }
);

export class ProviderTariff extends Model {
  declare timestamp: Date;
  declare provider_id?: string;
  declare rate?: number;
  declare tariff_id: string;
}

ProviderTariff.init(
  {
    timestamp: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    provider_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rate: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    tariff_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProviderTariff",
    tableName: "provider_tarrif",
    timestamps: false,
  }
);
