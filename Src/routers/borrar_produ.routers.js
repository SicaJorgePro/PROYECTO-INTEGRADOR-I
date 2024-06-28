const express = require("express");
const router = express.Router();

const { connectToMongoDB, disconnectToMongoDB } = require("../db/mongodb");

const base_dato = process.env.base;
const colec_base = process.env.coleccion_base;

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id) || 0;
  if (!req.params.id) {
    res.status(422).send("Error en el formato de los datos");
    return;
  }

  const client = await connectToMongoDB();
  if (!client) {
    res.status(500).res.render("error", { titulo: "ERROR DE SERVIDOR" });
    return;
  }

  const collection = client.db(base_dato).collection(colec_base);
  collection
    .deleteOne({ id })
    .then((response) => {
      if (response.deletedCount === 0) {
        res.status(404).send(`No existe el registro con ID: ${id}`);
      } else {
        res.status(202).send("Registro eliminado");
      }
    })
    .catch((error) => res.status(500).send("Error al borrar el registro"))
    .finally(async () => {
      await disconnectToMongoDB();
    });
});


module.exports = router;
