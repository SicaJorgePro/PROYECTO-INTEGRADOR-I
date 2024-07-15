const express = require("express");
const router = express.Router();

const controlerAltas= require("../contollers/altasProduc.controler");
const controlerModificar = require("../contollers/modificarProduc.controler");
const controlerBorrar = require("../contollers/BorrarProduc.controler");

//! GRUD DE PRODUCTOS 

// ? ALTAS DE PRODUCTOS
router.post("/", controlerAltas.altasProductos);

//  ? NODIFICAR PRODUCTOS POR ID
router.put("/:id", controlerModificar.ModificarProductos);

//  ? BORRAR PRODUCTOS POR ID 
router.delete("/:id", controlerBorrar.DeleteProductos);


module.exports = router;