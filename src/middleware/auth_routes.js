const express = require("express");
const router = express.Router();
const authController = require("./auth_controller");
const auth = require("./auth");

//Iniciar sesión
// api/auth
router.post("/", authController.validateUser);

//obtener usuario autenticado
router.get("/", auth, authController.userAuthentic);

module.exports = router;
