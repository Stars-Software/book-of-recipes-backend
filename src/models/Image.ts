import { sequelize } from "../config/database";
const { DataTypes } = require("sequelize");

const Image = sequelize.define(
  "images",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    path: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    timestamps: false,
  }
);

export default Image;
