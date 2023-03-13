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

module.exports = {
  indexPage,
  createPage,
  create,
};
