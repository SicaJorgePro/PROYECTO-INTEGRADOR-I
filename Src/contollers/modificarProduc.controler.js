const modulo_ModifProductos = require("../modulos/modificarProd.modulo");

const ModificarProductos = async (req, res) => {
  const id = parseInt(req.params.id) || 0;
  const modifproducto = req.body;
  const reg_modif = id;
  try {
   if (Object.keys(modifproducto).length === 0) {
      const error = new Error("ERROR...! NO HAY DATOS PARA MODIFICAR!!!");
      error.status = 422;
      throw error;
    }
    const modificar = await modulo_ModifProductos.Modulo_Modificar(
      reg_modif,
      modifproducto
    );
     if (modificar.matchedCount === 1) {
      res.status(200).json(modifproducto);
      return;
    } else {
            const error = new Error("Error...! Registro NO existente");
            error.status = 302;
            throw error;
    }
  } catch (error) {
          res.status(error.status).send(error.message);
  }
};

module.exports = {
  ModificarProductos,
};





  