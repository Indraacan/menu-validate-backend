const express = require("express");
const router = express.Router();
const MenuController = require("../controller/Menu");
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, res, cb) {
//     cb(null, "./public/images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   },
// });
// const upload = multer ({
//   storage : storage,
// });

router.post("/create", MenuController.create);
router.get("/show", MenuController.getAllData);

module.exports = router;