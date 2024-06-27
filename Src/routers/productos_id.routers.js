const express = require("express");
const router = express.Router();

const { connectToMongoDB, disconnectToMongoDB } = require("../mongodb");

const base_dato = process.env.base;
const colec_base = process.env.coleccion_base;

// ? mostar los productos por un id 
router.get("/productos/:id", async (req, res) => {
  const produc_id = parseInt(req.params.id) || 0;

  if (produc_id === 0) {
    res.status(404).render("error_404", { titulo: "PAGINA NO ENCONTRADA" });
    return;
  }
  const client = await connectToMongoDB();
  if (!client) {
    res.status(500).render("error", { titulo: "ERROR DE SERVIDOR" });
    return;
  }

  const db = client.db(base_dato);
  const producto = await db.collection(colec_base).findOne({ id: produc_id });

  // ? desactivar base db
  await disconnectToMongoDB();

  if (!producto) {
    res.status(404);
  } else {
    res.status(200);
  }
  res.render("listado_producto", { titulo: "PRODUCTOS", producto });
});





module.exports = router;