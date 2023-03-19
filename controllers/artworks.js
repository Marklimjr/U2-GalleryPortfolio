const Artwork = require("../models/artwork");
const Exhibition = require("../models/exhibition");

function createNew(req, res) {
  res.render("artworks/create");
}

const create = async (req, res) => {
  try {
    const artwork = new Artwork(req.body);
    const newArtwork = await artwork.save();
    console.log(`newArtwork: ${newArtwork}`);
    res.redirect("/artworks");
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      res.send(
        `Unable to submit form, please refer to error message -> ${errors}`
      );
    } else {
      console.log(err);
      res.send(`${errors}`);
    }
  }
};

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

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const updateArtwork = await Artwork.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.redirect("/artworks");
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      console.log(`Data Model Errors: ${errors}`);
      res.send(
        `Unable to submit form, please refer to error message -> ${errors}`
      );
    } else {
      console.log(err);
      res.send(`${errors}`);
    }
  }
};

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

module.exports = {
  create,
  createNew,
  index,
  editPage,
  update,
  del,
};
