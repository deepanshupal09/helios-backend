import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../config/db';

export class Users extends Model {
  declare email: string;
  declare name?: string;
  declare provider_id?: string;
  declare battery?: number;
  declare battery_capacity?: number;
  declare phone?: string;
  declare last_modified?: string;
  declare password: string;
}

Users.init({
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  provider_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  battery: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  battery_capacity: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  last_modified: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Users',
  tableName: 'users',
  timestamps: false
});