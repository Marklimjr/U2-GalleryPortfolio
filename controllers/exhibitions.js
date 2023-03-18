const Exhibition = require("../models/exhibition");
const Artwork = require("../models/artwork");
const opts = { runValidators: true };

function createNew(req, res) {
  res.render("exhibitions/create");
}

const create = async (req, res) => {
  try {
    const exhibition = new Exhibition(req.body);

    const newExhibition = await exhibition.save();
    console.log(`newExhibition: ${newExhibition}`);
    res.redirect("/exhibitions");
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

function index(req, res) {
  try {
    Exhibition.find()
      .populate("artworks")
      .exec()
      .then((exhibitions) => {
        // console.log("THIS IS EXHIBITION" + exhibitions);
        Artwork.find({}).then((artworks) => {
          // console.log("THIS IS ARTWORKS", artworks);
          res.render("exhibitions/index", { exhibitions, artworks });
        });
      });
  } catch (error) {
    res.send(error);
  }
}

function editPage(req, res) {
  const { id } = req.params;
  try {
    Exhibition.findById(id)
      .exec()
      .then((exhibitions) => {
        const context = { id, exhibitions };
        res.render("exhibitions/edit", context);
      });
  } catch (error) {
    res.send(error);
  }
}

function update(req, res) {
  const { id } = req.params;
  try {
    Exhibition.findByIdAndUpdate(id, req.body, { new: true })
      .exec()
      .then((exhibitions) => {
        res.redirect("/");
      });
  } catch (error) {
    res.send(error);
  }
}

function del(req, res) {
  const { id } = req.params;
  try {
    Exhibition.findByIdAndDelete(id)
      .exec()
      .then((exhibitions) => {
        res.redirect("/exhibitions");
      });
  } catch (error) {
    res.send(error);
  }
}

function updateArtwork(req, res) {
  const { id } = req.params;
  const artworkId = req.body.artworkId;
  try {
    Exhibition.findById(id).then((e) => {
      console.log(e);
      e.artworks.push(artworkId);
      e.save();
      res.redirect("/");
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
  updateArtwork,
};
