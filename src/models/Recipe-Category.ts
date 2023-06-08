import { sequelize } from "../config/database/pool";
import { Recipe } from "./Recipe";

const { DataTypes } = require("sequelize");

const foreignKey = "categoryId";

const RecipeCategory = sequelize.define(
  "recipe_categories",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    timestamps: false,
  }
);

RecipeCategory.hasMany(Recipe, { as: "recipes", foreignKey });

export default RecipeCategory;