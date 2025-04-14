const express = require("express");
const router = express.Router();
const imageRegex = /\.(svg|png|jpg|png|jpeg)$/;
const videoRegex = /\/.+\.(mp4|ogv)$/;
router.get(imageRegex, (req, res) => {
  const filePath = req.path;
  res.redirect(303, `${import.meta.env.VITE_API_URL}/src${filePath}`);
});
router.get(videoRegex, (req, res) => {
    const filePath = req.path;
    res.redirect(303, `${import.meta.env.VITE_API_URL}/src${filePath}`);
    });
module.exports = router;
