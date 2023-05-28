import { sequelize } from "../config/database/pool";
import Recipe from "./Recipe";
import User from "./User";
const { DataTypes } = require("sequelize");

const Product = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.TEXT, allowNull: false },
    amount: { type: DataTypes.INTEGER, default: 0, allowNull: false },
  },
  {
    timestamps: false,
  }
);

Product.belongsToMany(Recipe, { through: "RecipeProducts" });
Product.belongsToMany(User, { through: "UserProducts" });

export default Product;
