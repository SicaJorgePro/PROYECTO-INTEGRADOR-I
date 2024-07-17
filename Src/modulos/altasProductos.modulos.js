//? activar y desactivar la base
const { connectToMongoDB, disconnectToMongoDB } = require("../db/mongodb");

//? llamr a varibles de entorno que son nombre de la base
//? y nombre de la coleccion
const base_dato = process.env.base;
const colec_base = process.env.coleccion_base;

const mod_base = require("../modulos/errorbaseDato.modulo");

const ModuloaltasProd = async (reg_id, nuevoproducto,res) => {
  try {

    const client = await connectToMongoDB();
    const baseError = await mod_base.base_error(client); // **modulo de verificar base
    const db = client.db(base_dato);

    const reg_existente = await db
      .collection(colec_base)
      .findOne({ id: reg_id });
    
    console.log(reg_existente);
    console.log("1");

    if (reg_existente) {
                    const error = new Error("Registro Existente !!!!");
                    error.status = 302;
                    throw error;
    } else {
      console.log("NO EXISTE");
      console.log(nuevoproducto);

      const collection = client.db(base_dato).collection(colec_base);
      console.log("pasa");
      await collection.insertOne(nuevoproducto)
      const error = new Error();
      error.status = 202;
      throw error;
    }
  } catch (error) {
                console.log("2");
                throw error;
  } finally {
            console.log("3");
            await disconnectToMongoDB();
  }
};
 
module.exports = {
  ModuloaltasProd,
};

