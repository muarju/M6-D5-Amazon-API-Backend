import Category from "./Category.js";
import Product from "./Product.js";
import User from "./User.js";
import Comment from "./comment.js";
import sequelize from "../index.js";
import Orders from './Orders.js'
import Cart from './Cart.js'

//relation between product and category
Product.belongsTo(Category);
Category.hasMany(Product);

//relation between user, comment and Product
Comment.belongsTo(User)
User.hasMany(Comment)
Product.hasMany(Comment)

//relation between user, order
Orders.belongsTo(User)
User.hasMany(Orders)

//relation between Order, Product and cart
Cart.belongsTo(Orders)
Orders.hasMany(Cart,{ onDelete: "cascade",})

Cart.belongsTo(Product)
Product.hasMany(Cart)

export default { Category, sequelize, Product,User,Comment,Orders,Cart};
