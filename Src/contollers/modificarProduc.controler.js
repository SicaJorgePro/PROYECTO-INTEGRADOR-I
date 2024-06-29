//? activar y desactivar la base
const { connectToMongoDB, disconnectToMongoDB } = require("../db/mongodb");

//? llamr a varibles de entorno que son nombre de la base
//? y nombre de la coleccion
const base_dato = process.env.base;
const colec_base = process.env.coleccion_base;


const ModificarProductos = async (req, res) => {
  const id = parseInt(req.params.id) || 0;
  const modifproducto = req.body;
  const reg_modif = id;

  if (Object.keys(modifproducto).length === 0) {
    return res.status(422).send("No hay datos para modificar ");
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
};




module.exports = {
  ModificarProductos,
};