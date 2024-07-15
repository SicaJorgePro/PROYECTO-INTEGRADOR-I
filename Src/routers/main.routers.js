const express = require("express");
const router = express.Router();

const controler = require("../contollers/index.controler")

// ?llamar al controlador index
router.get("/", controler.index );

module.exports = router;
