import express from "express";
import db from "../../db/models/index.js";
const Product = db.Product;
const Category = db.Category;
const Comment=db.Comment;
const User=db.User;
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findAll({
        include: [Category,{ model: Comment,include:User}],
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Product.create(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
        const data = await Product.findByPk(req.params.id,{
          include: [Category,{ model: Comment,include:User}],
        });
        res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
    const data = await Product.update(req.body, {
        where: { id: req.params.id },
        returning: true,
        });
        res.send(data[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
        const rows = await Product.destroy({
            where: {
              id: req.params.id,
            },
          });
          if (rows > 0) {
            res.send("Deleted");
          } else {
            res.status(404).send("not found");
          }

    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  router
  .route("/pagination/:offset/:limit")
  .get(async (req, res, next) => {
    try {
      const { offset, limit } = req.params
      const {order} = req.query
  
      const data = await Product.findAll({
        include: Category,
        limit: limit,
        offset: offset,
      })
      if (data) {
        res.status(200).send(data)
      } else {
        res.status(404).send("not found")
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
export default router;
