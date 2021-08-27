import Category from "./Category.js";
import Product from "./Product.js";
import User from "./User.js";
import Comment from "./comment.js";
import sequelize from "../index.js";

Product.belongsTo(Category);
Category.hasMany(Product);
Comment.belongsTo(User)
User.hasMany(Comment)
Product.hasMany(Comment)

export default { Category, sequelize, Product,User,Comment };
