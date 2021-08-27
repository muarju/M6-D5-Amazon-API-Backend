import express from "express";
import db from "../../db/models/index.js";
import bcrypt from 'bcryptjs'
const User=db.User;
const Comment=db.Comment;
//const bcrypt = require('bcryptjs');
import s from "sequelize";

const { Op } = s;

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await User.findAll({
        include: Comment,
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const password= req.body.password
      const passwordHash = bcrypt.hashSync(password, 10);
      const data = await User.create({...req.body, password: passwordHash});
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
      const data = await User.findByPk(req.params.id,{
        include: Comment,
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await User.update(req.body, {
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
      const rows = await User.destroy({
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
  .route("/login/:email/:password")
  .get(async (req, res, next) => {
    try {
      const {email,password}=req.params;
      console.log(req.body)
      const data = await User.findOne({where: {
        email: email
      }});
       // check account found and verify password
      if (!data || !bcrypt.compareSync(password, data.password)) {
        res.status(401).send("authentication failed");
      } else {
        // authentication successful
        res.send(data);
      }
     
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
export default router;
