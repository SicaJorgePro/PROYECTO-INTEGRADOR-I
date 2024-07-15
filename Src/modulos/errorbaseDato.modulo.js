const base_error = async (client) => {
  try {
    if (!client) {
      const error = new Error("ERROR DE SERVIDOR");
      error.status = 500;
      throw error;
    }
     return;
    
  } catch (error) {
     throw error;
  }
};

module.exports = {
  base_error,
};
