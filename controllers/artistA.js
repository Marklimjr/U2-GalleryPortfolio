const ArtistA = require("../models/artistA");
const Location = require("../models/locationInfo");

// function artistPage(req, res) {
//   res.render("artistA");
// }

async function artistPage(req, res) {
  try {
    ArtistA.find()
      .populate("location")
      .then((artworks) => {
        res.render("artistA", { artworks });
      });
  } catch (error) {
    res.send("this not it mate");
  }
}

function createPage(req, res) {
  res.render("artistAcrud/create");
}

async function create(req, res) {
  const artwork = new ArtistA(req.body);
  try {
    artwork.save();
    res.redirect("/artistA");
  } catch (error) {
    res.redirect("/artistA/createNew");
  }
}

async function editPost(req, res) {
  const { id } = req.params;
  try {
    ArtistA.findById(id).then((artworks) => {
      const context = { id, artworks };
      res.render("artistAcrud/edit", context);
    });
  } catch (error) {
    res.send("this edit not working m8");
  }
}

async function update(req, res) {
  const { id } = req.params;
  try {
    ArtistA.findByIdAndUpdate(id, req.body, { new: true })
      .exec()
      .then((artworks) => {
        res.redirect("/artistA");
      });
  } catch (error) {}
}

module.exports = {
  artistPage,
  createPage,
  create,
  editPost,
  update,
};
