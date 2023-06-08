import { sequelize } from "../config/database/pool";
import { ProductCategory } from "./Product-Category";
import { Recipe } from "./Recipe";
import User from "./User";
const { DataTypes } = require("sequelize");

const onUpdate = "CASCADE";

export const Product = sequelize.define(
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

Product.belongsToMany(User, {
  through: UserProduct,
  onUpdate,
});

User.belongsToMany(Product, {
  through: UserProduct,
  onUpdate,
});

Recipe.belongsToMany(Product, {
  through: UserProduct,
  onUpdate,
});

Product.belongsToMany(Recipe, {
  through: UserProduct,
  onUpdate,
});

Product.belongsTo(ProductCategory, { as: "product_categories", foreignKey: 'categoryId' });