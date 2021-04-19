const fs = require("fs");

const db = require("../models");
const User = db.users;

module.exports = {
  async create(req, res) {
    try {

      if (req.file == undefined) {
        return res.status(400).json({ message: "Send a image!" });
      }

      User.create({
        name: req.body.name,
        birth: req.body.birth,
        photo: fs.readFileSync(
          __basedir + "/public/images/upload_images/" + req.file.filename
        ),
      }).then((image) => {
        fs.writeFileSync(
          __basedir + "/public/images/tmp/" + image.name,
          image.data
        );

        return res.send(`Users has created.`);
      });
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying create user ${error}`);
    }
  },

  async index(req, res) {
    try {
      const users = await User.findAll();

      return res.send(users);
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying get all users ${error}`);
    }
  },

  async userdata(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      return res.send(user);
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying updated user ${error}`);
    }
  },

  async update(req, res) {
    try {
      const user = await User.update(
        {
          name: req.body.name,
          birth: req.body.birth,
          photo: req.body.photo,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.send(user);
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying updated user ${error}`);
    }
  },

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      user.destroy();

      return res.send(`User has deleted !`);
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying updated user ${error}`);
    }
  },
};
