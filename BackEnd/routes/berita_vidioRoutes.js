const express = require("express");
const router = express.Router();
const vidioberitaController = require("../controllers/berita_videoController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", vidioberitaController.getVideos);
router.get("/:id", vidioberitaController.getVideoDetail);
router.post("/upload", vidioberitaController.uploadVideo);
router.delete("/:id", authMiddleware, vidioberitaController.deleteVideo);

module.exports = router;
