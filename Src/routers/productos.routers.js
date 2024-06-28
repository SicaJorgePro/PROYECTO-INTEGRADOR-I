const express = require("express");
const router = express.Router();

const controler= require("../contollers/productos.controler")

// ? mostar todo los productos
router.get("/", controler.productos_all);

// ? mostar los productos por un id 
router.get("/:id", controler.productos_id);

//? mostar las los productos por categioria
router.get("/categorias/:categ", controler.produc_categoria);



module.exports = router;