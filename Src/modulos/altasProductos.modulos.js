//? activar y desactivar la base
const { connectToMongoDB, disconnectToMongoDB } = require("../db/mongodb");

//? llamar a variables de entorno que son nombres de la base
//? y nombre de la colección
const base_dato = process.env.base;
const colec_base = process.env.coleccion_base;

// ? requerir la base activa
const mod_base = require("../modulos/errorbaseDato.modulo");

const ModuloaltasProd = async (reg_id, nuevoproducto) => {
  try {

    const client = await connectToMongoDB();
    const baseError = await mod_base.base_error(client); // **modulo de verificar base
    const db = client.db(base_dato);

    const reg_existente = await db
      .collection(colec_base)
      .findOne({ id: reg_id });
     if (reg_existente) {
                    const error = new Error("Registro Existente !!!!");
                    error.status = 302;
                    throw error;
    } else {
      const collection = await db
        .collection(colec_base).insertOne(nuevoproducto);
         return collection;
    }
  } catch (error) {
               throw error;
  } finally {
    
          await disconnectToMongoDB();
  }
};
 
module.exports = {
  ModuloaltasProd,
};

