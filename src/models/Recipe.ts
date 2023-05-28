import { sequelize } from "../config/database/pool";
import Product from "./Product";
const { DataTypes } = require("sequelize");

const Recipe = sequelize.define(
  "recipes",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.TEXT, allowNull: false },
    desription: { type: DataTypes.TEXT, allowNull: false },
    video: { type: DataTypes.TEXT, allowNull: true },
    private: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  },
  {
    timestamps: false,
  }
);

Recipe.belongsToMany(Product, { through: "RecipeProducts" });

export default Recipe;
