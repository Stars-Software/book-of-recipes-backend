import { sequelize } from "../config/database/pool";
import { Product } from "./User-Product";
const { DataTypes } = require("sequelize");

const foreignKey = "categoryId";

export const ProductCategory = sequelize.define(
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
