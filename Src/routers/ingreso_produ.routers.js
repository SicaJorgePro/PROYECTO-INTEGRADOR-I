const express = require("express");
const router = express.Router();

const { connectToMongoDB, disconnectToMongoDB } = require("../db/mongodb");

const base_dato = process.env.base;
const colec_base = process.env.coleccion_base;


router.post("/", async (req, res) => {
  const nuevoproducto = req.body;
  const reg_id = nuevoproducto.id;

  if (Object.keys(nuevoproducto).length === 0) {
    return res.status(422).send("ERROR...! NO HAY DATOS PARA AGREGAR");
  }
  const client = await connectToMongoDB();
  if (!client) {
    res.status(500).res.render("error", { titulo: "ERROR DE SERVIDOR" });
    return;
  }

  // ? verificar si el registro existe
  const db = client.db(base_dato);
  const reg_existente = await db.collection(colec_base).findOne({ id: reg_id });

  if (reg_existente) {
    res.status(302).send("Error...! Registro existente");
    await disconnectToMongoDB();
    return;
  } else {
    const collection = client.db(base_dato).collection(colec_base);
    collection
      .insertOne(nuevoproducto)
      .then((response) => res.status(201).json(nuevoproducto))
      .catch((error) => res.status(500).send("Error al crear el registro"))
      .finally(async () => {
        await disconnectToMongoDB();
      });
  }
});





module.exports = router;