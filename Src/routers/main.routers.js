const express = require("express");
const router = express.Router();

const controler=require("../contollers/index.controler")
router.get("/", controler.index );

module.exports = router;
