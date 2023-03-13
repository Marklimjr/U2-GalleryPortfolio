const LocationInfo = require("../models/locationInfo");

async function indexPage(req, res) {
  try {
    LocationInfo.find().then((locations) => {
      res.render("locationInfoIndex", { locations });
    });
  } catch (error) {
    res.send(error);
  }
}

async function createPage(req, res) {
  try {
    res.render("locationInfoCrud/create");
  } catch (error) {
    res.send("this not it mate");
  }
}

async function create(req, res) {
  const locationInfo = new LocationInfo(req.body);
  try {
    locationInfo.save();
    res.redirect("/locationInfo");
  } catch (error) {
    res.redirect("/locationInfo/createNew");
  }
}

async function editPost(req, res) {
  const { id } = req.params;
  try {
    LocationInfo.findById(id).then((locations) => {
      const context = { id, locations };
      res.render("locationInfoCrud/edit", context);
    });
  } catch (error) {
    res.send("this edit not working m8");
  }
}

async function update(req, res) {
  const { id } = req.params;
  try {
    LocationInfo.findByIdAndUpdate(id, req.body, { new: true })
      .exec()
      .then((locations) => {
        res.redirect("/locationInfo");
      });
  } catch (error) {}
}

async function del(req, res) {
  const { id } = req.params;
  try {
    LocationInfo.findByIdAndDelete(id)
      .exec()
      .then((locations) => {
        res.redirect("/locationInfo");
      });
  } catch (error) {
    res.redirect("/locationInfo");
  }
}

module.exports = {
  indexPage,
  createPage,
  create,
  editPost,
  update,
  del,
};
