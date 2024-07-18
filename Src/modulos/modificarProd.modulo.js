//? activar y desactivar la base
const { connectToMongoDB, disconnectToMongoDB } = require("../db/mongodb");

//? llamar a variables de entorno que son nombres de la base
//? y nombre de la colección
const base_dato = process.env.base;
const colec_base = process.env.coleccion_base;

const mod_base = require("../modulos/errorbaseDato.modulo");

const Modulo_Modificar = async (reg_modif, modifproducto) => {
  try {
    const client = await connectToMongoDB();
    const baseError = await mod_base.base_error(client); // **módulo de verificar base
    // * si esta la base es correcta devuelve false
    if (baseError == false) {
         const db = client.db(base_dato);
      const collection = await db.collection(colec_base).updateOne({ id: reg_modif }, { $set: modifproducto });
        return collection;
    }
  } catch (error) {
                  throw error;
  } finally {
    await disconnectToMongoDB();
  }
};

module.exports = {
  Modulo_Modificar,
};
