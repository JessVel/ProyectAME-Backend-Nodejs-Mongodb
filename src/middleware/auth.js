const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //leer token del header
  const token = req.header("x-auth-token");

  //validar si hay token
  if (!token) {
    return res.status(401).json({ msg: "No hay token, permiso no válido" });
  }

  try {
    const decodeToken = jwt.verify(token, process.env.CLAVE_SECRETA);
    req.user = decodeToken.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido" });
  }
};
