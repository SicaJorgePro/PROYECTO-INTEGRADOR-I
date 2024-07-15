//? activar y desactivar la base
const { connectToMongoDB, disconnectToMongoDB } = require("../db/mongodb");

//? llamar a varibles de entorno que son nombre de la base
//? y nombre de la coleccion
const base_dato = process.env.base;
const colec_base = process.env.coleccion_base;

const mod_base = require("../modulos/errorbaseDato.modulo");

const modulo_Prod_Id = async (produc_id) => {
  try {
    if (produc_id === 0) {
      const error = new Error("PAGINA NO ENCONTRADA");
      error.status = 404;
      throw error;
    }
    const client = await connectToMongoDB();
        const base_Dato = await mod_base.base_error(client); // **modulo de verificar base
        const db = client.db(base_dato);
      const producto = await db.collection(colec_base).findOne({ id: produc_id });
      return producto;

  } catch (error) {
       throw error;
 } finally {
      await disconnectToMongoDB();
  }
};

module.exports = {
  modulo_Prod_Id,
};
