import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Product = sequelize.define("product", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Product;
