const TareaModel = require("../models/tarea_model");
const ProyectoModel = require("../models/proyecto_model");
const { validationResult } = require("express-validator");

exports.crearTarea = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { proyecto } = req.body;

    const existeProyecto = await ProyectoModel.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    if (existeProyecto.creador.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    const tarea = new TareaModel(req.body);
    await tarea.save();
    res.json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerTareas = async (req, res) => {
  try {
    const proyecto = await ProyectoModel.findById(req.params.id);

    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    if (proyecto.creador.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    const tareas = await TareaModel.find({ proyecto });
    res.json(tareas);
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    const { proyecto, nombre, estado } = req.body;

    let tarea = await TareaModel.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ mgs: "La tarea no existe" });
    }

    const existeProyecto = await ProyectoModel.findById(proyecto);

    if (existeProyecto.creador.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    const nuevaTarea = {};

    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    tarea = await TareaModel.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });

    res.json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    const { proyecto } = req.query;

    console.log(proyecto);

    let tarea = await TareaModel.findById(req.params.id);

    console.log(tarea);

    if (!tarea) {
      return res.status(404).json({ mgs: "La tarea no existe" });
    }

    const existeProyecto = await ProyectoModel.findById(proyecto);

    if (existeProyecto.creador.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    await TareaModel.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Tarea eliminada!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
