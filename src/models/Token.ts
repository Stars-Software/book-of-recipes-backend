import { sequelize } from '../config/database';
const { DataTypes } = require('sequelize');

const Token = sequelize.define(
  'tokens',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Token;
