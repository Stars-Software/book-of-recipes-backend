import { sequelize } from "../config/database";
import Recipe from "./Recipe";
import Category from "./Category";
import Product from "./Product";
import Token from "./Token";
const { DataTypes } = require("sequelize");

const foreignKey = "userId";

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Product, { as: "products", foreignKey });
User.hasMany(Token, { as: "tokens", foreignKey });
User.hasMany(Category, { as: "categories", foreignKey });
User.hasMany(Recipe, { as: "recipes", foreignKey });

export default User;