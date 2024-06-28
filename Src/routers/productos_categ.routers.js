const express = require("express");
const router = express.Router();

const { connectToMongoDB, disconnectToMongoDB } = require("../db/mongodb");

const base_dato = process.env.base;
const colec_base = process.env.coleccion_base;

//  ? rutas de productos por categorias

router.get("/productos/categorias/:categ", async (req, res) => {
  const produc_cat = req.params.categ || "";
  const client = await connectToMongoDB();

  if (!client) {
    res.render("error", { titulo: "ERROR DE SERVIDOR" });
    return;
  }

  const db = client.db(base_dato);

  const productos = await db
    .collection(colec_base)
    .find({ categoria: { $regex: produc_cat, $options: "i" } })
    .sort({ nombre: 1 })
    .toArray();

  // ? desactivar base db
  await disconnectToMongoDB();

  if (Object.keys(productos).length === 0) {
    res.status(404);
  } else {
    res.status(200);
  }
  res.render("listados", { titulo: "PRODUCTOS POR CATEGORIA", productos });
});




module.exports = router;