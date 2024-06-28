const express = require("express");
const router = express.Router();

const { connectToMongoDB, disconnectToMongoDB } = require("../db/mongodb");

const base_dato = process.env.base;
const colec_base = process.env.coleccion_base;

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id) || 0;
  const modifproducto = req.body;
  const reg_modif = id;

  if (Object.keys(modifproducto).length === 0) {
    return res.status(422).send("Error en el formato de los datos");
  }
  const client = await connectToMongoDB();
  if (!client) {
    res.status(500).res.render("error", { titulo: "ERROR DE SERVIDOR" });
    return;
  }
  const db = client.db(base_dato);
  const reg_exi_modi = await db
    .collection(colec_base)
    .findOne({ id: reg_modif });

  if (!reg_exi_modi) {
    res.status(302).send("Error...! Registro NO existente");
    await disconnectToMongoDB();
    return;
  } else {
    const collection = client.db(base_dato).collection(colec_base);
    collection
      .updateOne({ id }, { $set: modifproducto })
      .then((response) => res.status(201).json(modifproducto))
      .catch((error) => res.status(500).send("Error al crear el registro"))
      .finally(async () => {
        await disconnectToMongoDB();
      });
  }
});

module.exports = router;
