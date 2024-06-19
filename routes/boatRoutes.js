const express = require("express");
const multer = require("multer");

const {
  createBoat,
  getBoats,
  getBoatById,
  updateBoat,
  deleteBoatById,
  updateBoat2,
} = require("../controllers/boatController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post("/boats", upload.array("images", 10), createBoat);
router.get("/boats/boatdata", getBoats);
router.get("/boats/:boatId", getBoatById);
router.put("/boats/:boatId", upload.array("images", 10), updateBoat);
router.delete("/boats/:boatId", deleteBoatById);
router.delete("/boats/:boatId", updateBoat2);

module.exports = router;
