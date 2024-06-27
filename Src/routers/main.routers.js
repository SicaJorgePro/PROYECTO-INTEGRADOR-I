const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  res.render("portada", { titulo: "PORTADA DE INICIO" });
});


module.exports = router;
