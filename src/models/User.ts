import { sequelize } from "../config/database/pool";
import Token from "./Token";
import Image from "./Image";
import Product from "./Product";
import ProductCategory from "./Product-Category";
import { Recipe } from "./Recipe";

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

User.getProducts = async (userId: string, options: any) => {
  const where: any = {};

  for (const [key, value] of Object.entries(options)) {
    if (value) {
      where[key] = value;
    }
  }

  const data = await User.findOne({
    where: { id: userId },
    include: [
      {
        model: Product,
        through: {
          attributes: ["amount"],
        },
        include: [
          {
            model: ProductCategory,
            as: "product_categories",
            attributes: ["image", "title"],
          },
        ],
        where,
      },
    ],
  });

  return data ? data.products : [];
};

User.hasOne(Token, { as: "tokens", foreignKey });
Token.belongsTo(User, { as: "users", foreignKey });
User.hasOne(Image, { as: "avatar", foreignKey });
Image.belongsTo(User, { as: "users", foreignKey });
User.hasMany(Recipe, { as: "recipes", foreignKey });
Recipe.belongsTo(User, { as: "recipes", foreignKey });

export default User;
