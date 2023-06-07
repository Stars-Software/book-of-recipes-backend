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
    image: { type: DataTypes.TEXT, allowNull: false },
    title: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    timestamps: false,
  }
);

Product.belongsTo(ProductCategory, { as: "product_categories", foreignKey });

export default ProductCategory;
