const Exhibition = require("../models/exhibition");
const Artwork = require("../models/artwork");

function home(req, res) {
  try {
    Exhibition.find({}).then((exhibitions) => {
      res.render("index", { exhibitions });
    });
  } catch (error) {}
}

module.exports = {
  home,
};
