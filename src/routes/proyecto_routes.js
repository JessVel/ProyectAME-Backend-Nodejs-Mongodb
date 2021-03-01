const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyecto_controller");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

// /api/proyectos
//crear proyecto
router.post("/", [check("nombre", "El nombre es obligatorio").not().isEmpty()], auth, proyectoController.crearProyecto);

//obtener todos los proyectos del usuario autenticado
router.get("/", auth, proyectoController.obtenerProyectos);

//editar proyecto del usuario autenticado
router.put("/:id", auth, [check("nombre", "El nombre es obligatorio").not().isEmpty()], proyectoController.actualizarProyecto);

//Eliminar un proyecto
router.delete("/:id", auth, proyectoController.eliminarProyecto);

module.exports = router;
