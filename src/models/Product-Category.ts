import { sequelize } from "../config/database/pool";
import Product from "./Product";
const { DataTypes } = require("sequelize");

const foreignKey = "categoryId";

const ProductCategory = sequelize.define(
  "product_categories",
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

ProductCategory.hasMany(Product, { as: "products", foreignKey });

export default ProductCategory;
