import express from "express";
import db from "../../db/models/index.js";
const Comment = db.Comment;
const Product=db.Product;
const User=db.User;
import s from "sequelize";
const { Op } = s;

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Comment.findAll({
        include: User,
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Comment.findByPk(req.params.id,{
        include: User,
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await Comment.update(req.body, {
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
      const rows = await Comment.destroy({
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
  .route("/:ProductId/:userId")
  .post(async (req, res, next) => {
    try {
      const data = await Comment.create({...req.body,productId: req.params.ProductId,userId: req.params.userId});
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
export default router;
