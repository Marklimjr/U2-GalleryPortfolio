function loginPage(req, res) {
  res.render("users/login");
}

function loginSubmit(req, res) {
  res.send("login");
}

const createUserLoginDetails = async (req, res) => {
  //post
  //ok
  const email = req.body.email;
  const userid = req.body.userid;
  const password = req.body.password;
  console.log(req.body);

  if (password.length < 3) {
    res.render("users/signup", {
      message: "Password must be at least 3 characters or more!",
    });
    return;
  }

  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      email: email,
      userid: userid,
      password: passwordHash,
    });

    if (res.status(200)) {
      res.redirect("/");
    }
  } catch (err) {
    if (err.code === 11000) {
      res.render("users/signup", { message: "Userid already exist!" });
    } else if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      res.render("users/signup", { message: errors });
    } else {
      console.log(err);
      res.render("users/error", { message: err });
    }
  }
};

const login = async (req, res) => {
  //post
  const userid = req.body.userid;
  const password = req.body.password;
  const id = req.session.id;
  console.log("Session Id: ", id);

  try {
    const user = await User.findOne({ userid: userid }).exec();

    if (!user) {
      res.render("users/login", { message: "Invalid Credentials!" }); // include message in login page
      return;
    }

    const checkMatch = await bcrypt.compare(password, user.password);

    if (checkMatch) {
      console.log(req.body);
      req.session.userId = user._id;
      console.log(`from checkmatch userid: ${id}`);
      console.log(`req.session.userId: ${req.session.userId}`);
      res.redirect("/");
    } else {
      res.render("users/login", { message: "Invalid Credentials!" });
    }
  } catch (err) {
    res.render("users/login", { message: "Invalid Credentials!" });
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
  login,
  isAuth,
  createUserLoginDetails,
};
