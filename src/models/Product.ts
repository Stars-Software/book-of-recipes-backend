import { sequelize } from "../config/database";
import SubTask from "./Category";
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

Product.hasMany(SubTask, {
  as: "categories",
  foreignKey: "categoryId",
});

export default Product;