const User = require("../models/users");
const bcrypt = require("bcrypt");
const Exhibition = require("../models/exhibition");

const saltRounds = 10;

function index(req, res) {
  Exhibition.find({}).then((exhibitions) => {
    res.render("users/adminIndex", { exhibitions });
  });
}

function loginPage(req, res) {
  res.render("users/login");
}

function createUser(req, res) {
  res.render("users/create");
}

const createUserLoginDetails = async (req, res) => {
  const userid = req.body.userid;
  const password = req.body.password;
  console.log(req.body);

  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      userid: userid,
      password: passwordHash,
    });

    if (res.status(200)) {
      res.redirect("/users/login");
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      res.render("users/create", { message: errors });
    } else {
      console.log(err);
      res.render("users/create", { message: err });
    }
  }
};

const loginSubmit = async (req, res) => {
  //post
  const userid = req.body.userid;
  const password = req.body.password;
  const id = req.session.id;
  console.log("Session Id: ", id);

  try {
    const user = await User.findOne({ userid: userid }).exec();

    if (!user) {
      res.render("users/login", { message: "Wrong ID/Password" }); // include message in login page
      return;
    }

    const checkMatch = await bcrypt.compare(password, user.password);

    if (checkMatch) {
      console.log(req.body);
      req.session.userId = user._id;
      console.log(`from checkmatch userid: ${id}`);
      console.log(`req.session.userId: ${req.session.userId}`);
      res.redirect("/users/admin");
    } else {
      res.render("users/login", { message: "Invalid Credentials" });
    }
  } catch (err) {
    res.render("users/login", { message: "Invalid Credentials" });
  }
};

const isAuth = async (req, res, next) => {
  const userId = req.session.userId;
  console.log("userId isAuth: ", userId);
  if (userId) {
    const user = await User.findById(userId).exec();
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  } else {
    res.redirect("/users");
  }
};

module.exports = {
  loginPage,
  loginSubmit,
  createUserLoginDetails,
  createUser,
  isAuth,
  index,
};
