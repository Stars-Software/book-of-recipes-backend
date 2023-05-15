import { IRecipeProduct } from "../types/recipe.type";
import { sequelize } from "../config/database/pool";
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
    video: { type: DataTypes.TEXT },
    products: {
      type: DataTypes.STRING,
      get: () => {
        return JSON.parse(Recipe.getDataValue("products"));
      },
      set: (data: IRecipeProduct) => {
        const values = Recipe.getDataValue("products");
        values.push(data);
        return Recipe.setDataValue("products", JSON.stringify(values));
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Recipe;
