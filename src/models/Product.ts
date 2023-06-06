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
  },
  {
    timestamps: false,
  }
);

export const UserProduct = sequelize.define(
  "user_products",
  {
    amount: { type: DataTypes.INTEGER, default: 0, allowNull: false },
  },
  {
    timestamps: false,
  }
);

export const RecipeProduct = sequelize.define(
  "recipe_products",
  {
    amount: { type: DataTypes.INTEGER, default: 0, allowNull: false },
  },
  {
    timestamps: false,
  }
);

Product.belongsToMany(Recipe, { through: RecipeProduct });
Recipe.belongsToMany(Product, { through: RecipeProduct });

Product.belongsToMany(User, { through: UserProduct });
User.belongsToMany(Product, { through: UserProduct });

export default Product;
