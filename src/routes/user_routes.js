const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const { check } = require("express-validator");

//Crear usuario
router.post(
  "/",
  [
    check("user", "El usurio es obligatirio").not().isEmpty(),
    check("name", "El nombre es obligatirio").not().isEmpty(),
    check("lastname", "El apellido es obligatirio").not().isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser mínimo de 6 caracteres").isLength({ min: 6 }),
  ],
  userController.createUser
);

module.exports = router;
