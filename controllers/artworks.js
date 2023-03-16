const Artwork = require("../models/artwork");
const Exhibition = require("../models/exhibition");

module.exports = {
  create,
  createNew,
  index,
  editPage,
  update,
  del,
};

function createNew(req, res) {
  res.render("artworks/create");
}

function create(req, res) {
  const artwork = new Artwork(req.body);
  try {
    artwork.save();
    res.redirect("/artworks");
  } catch (error) {
    res.render(error);
  }
}

function index(req, res) {
  try {
    Artwork.find({}).then((artworks) => {
      res.render("artworks/index", { artworks });
    });
  } catch (error) {
    res.send(error);
  }
}

function editPage(req, res) {
  const { id } = req.params;
  try {
    Artwork.findById(id)
      .exec()
      .then((artworks) => {
        const context = { id, artworks };
        res.render("artworks/edit", context);
      });
  } catch (error) {
    res.send(error);
  }
}

function update(req, res) {
  const { id } = req.params;
  try {
    Artwork.findByIdAndUpdate(id, req.body, { new: true })
      .exec()
      .then((artworks) => {
        res.redirect("/");
      });
  } catch (error) {
    res.send(error);
  }
}

function del(req, res) {
  const { id } = req.params;
  try {
    Artwork.findByIdAndDelete(id)
      .exec()
      .then((artworks) => {
        res.redirect("/artworks");
      });
  } catch (error) {
    res.send(error);
  }
}
