import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Cart = sequelize.define(
  "cart",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

export default Cart;
