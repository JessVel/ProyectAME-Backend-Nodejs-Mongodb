const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/tarea_controller");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

// api/tareas
//crear tarea
router.post("/", auth, [check("nombre", "El nombre es obligatorio").not().isEmpty(), check("proyecto", "El proyecto es obligatorio").not().isEmpty()], tareaController.crearTarea);

//obtener tareas por proyecto
router.get("/:id", auth, tareaController.obtenerTareas);

// actualizar tarea
router.put("/:id", auth, tareaController.actualizarTarea);

//eliminar una tarea
router.delete("/:id", auth, tareaController.eliminarTarea);

module.exports = router;
