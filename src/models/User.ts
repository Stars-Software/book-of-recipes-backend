import { sequelize } from "../config/database/pool";
import Token from "./Token";
import Image from "./Image";
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

User.hasOne(Token, { as: "tokens", foreignKey });
Token.belongsTo(User, { as: "users", foreignKey });
User.hasOne(Image, { as: "avatar", foreignKey });
Image.belongsTo(User, { as: "users", foreignKey });

export default User;
