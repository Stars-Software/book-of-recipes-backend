import { sequelize } from "../config/database/pool";
const { DataTypes } = require("sequelize");

const Image = sequelize.define(
  "images",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    filename: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    timestamps: false,
  }
);

export default Image;
