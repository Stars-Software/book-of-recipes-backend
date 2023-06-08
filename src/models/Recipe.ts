import { sequelize } from "../config/database/pool";
import RecipeCategory from "./Recipe-Category";
const { DataTypes } = require("sequelize");

export const Recipe = sequelize.define(
  "recipes",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    private: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  },
  {
    timestamps: false,
  }
);

