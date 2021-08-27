import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Comment = sequelize.define(
  "comment",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

export default Comment;
