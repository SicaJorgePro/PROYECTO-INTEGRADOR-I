//? activar y desactivar la base
const { connectToMongoDB, disconnectToMongoDB } = require("../db/mongodb");

//? llamr a varibles de entorno que son nombre de la base
//? y nombre de la coleccion
const base_dato = process.env.base;
const colec_base = process.env.coleccion_base;

const mod_base = require("../modulos/errorbaseDato.modulo");

const Modulo_Modificar = async (reg_modif, modifproducto) => {
  try {
    const client = await connectToMongoDB();
    const baseError = await mod_base.base_error(client); // **modulo de verificar base
    // * si esta la base es correcta devuelve false
    if (baseError == false) {
       console.log("es")
      const db = client.db(base_dato);
      const reg_exi_modi = await db.collection(colec_base).findOne({ id: reg_modif });
      // if (!reg_exi_modi) {
      //   const error = new Error("Error...! Registro NO existente");
      //   error.status = 302;
      //   throw error;
      // } else {
        const collection = await db
          .collection(colec_base)
          .updateOne({ id: reg_modif }, { $set: modifproducto });
        return collection;
      }
    // }   
  } catch (error) {
                  throw error;
  } finally {
    await disconnectToMongoDB();
  }
};

module.exports = {
  Modulo_Modificar,
};
