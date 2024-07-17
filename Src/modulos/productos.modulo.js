//? activar y desactivar la base
const { connectToMongoDB, disconnectToMongoDB } = require("../db/mongodb");

//? llamar a varibles de entorno que son nombre de la base
//? y nombre de la coleccion
const base_dato = process.env.base;
const colec_base = process.env.coleccion_base;

const mod_base = require("../modulos/errorbaseDato.modulo");

const modulo_prod = async () => {
 try {
   const client = await connectToMongoDB();
   const baseError = await mod_base.base_error(client); // **modulo de verificar base
   const db = client.db(base_dato);
   const productos = await db
     .collection(colec_base)
     .find()
     .sort({ id: 1 })
     .toArray();
   return productos;
 } catch (error) {
    throw error;
  }finally {
      await disconnectToMongoDB();
  }
 
};



module.exports = {
  modulo_prod,
};




