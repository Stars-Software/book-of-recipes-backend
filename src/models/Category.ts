import { sequelize } from "../config/database";
import Product from "./Product";
const { DataTypes } = require("sequelize");

const foreignKey = "categoryId";

const Category = sequelize.define(
  "categories",
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

Category.hasMany(Product, { as: "products", foreignKey });

export default Category;
