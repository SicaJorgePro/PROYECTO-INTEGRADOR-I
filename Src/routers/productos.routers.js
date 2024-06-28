const express = require("express");
const router = express.Router();

const { connectToMongoDB, disconnectToMongoDB } = require("../db/mongodb");

const base_dato = process.env.base;
const colec_base = process.env.coleccion_base;

// ? mostar todo los productos
router.get("/productos", async (req, res) => {
  const client = await connectToMongoDB();
  if (!client) {
    res.status(500).render("error", { titulo: "ERROR DE SERVIDOR" });
    return;
  }

  const db = client.db(base_dato);
  const productos = await db
    .collection(colec_base)
    .find()
    .sort({ id: 1 })
    .toArray();
  await disconnectToMongoDB();
  res.render("listados", { titulo: "PRODUCTOS DE VENTAS", productos });
});

module.exports = router;