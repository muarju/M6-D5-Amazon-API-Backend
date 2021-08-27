import express from "express";
import db from "../../db/models/index.js";
const User=db.User;
const Orders=db.Orders;
import s from "sequelize";
const { Op } = s;

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Orders.findAll({
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
      const data = await Orders.findByPk(req.params.id,{
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
      const data = await Orders.update(req.body, {
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
      const rows = await Orders.destroy({
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
