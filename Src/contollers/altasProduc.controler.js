const modulo_altasProducto=require("../modulos/altasProductos.modulos")

const altasProductos = async (req, res) => {
  const nuevoproducto = req.body;
  const reg_id = nuevoproducto.id;
  
  try {
    if (Object.keys(nuevoproducto).length === 0) {
      const error = new Error("ERROR...! NO HAY DATOS PARA AGREGAR!!!");
      error.status = 422;
      throw error;
             
    }
    const Altas_Productos = await modulo_altasProducto.ModuloaltasProd(
      reg_id,
      nuevoproducto);
    if (Altas_Productos.acknowledged === true); {
                        res.status(200).json(nuevoproducto);
                        return;
    }
    
  } catch (error) {
         res.status(error.status).send(error.message);
   
  }
}
 


module.exports = {
  altasProductos
};