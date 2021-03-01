const ProyectoModel = require("../models/proyecto_model");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const proyecto = new ProyectoModel(req.body);
    proyecto.creador = req.user.id;
    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await ProyectoModel.find({ creador: req.user.id }).sort({ creado: -1 });
    res.json({ proyectos });
    console.log();
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.actualizarProyecto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    let proyecto = await ProyectoModel.findById(req.params.id);

    if (!proyecto) {
      res.status(404).json("El proyecto no existe");
      return;
    }

    if (proyecto.creador.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    proyecto = await ProyectoModel.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto }, { new: true });

    res.json({ proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarProyecto = async (req, res) => {
  try {
    let proyecto = await ProyectoModel.findById(req.params.id);

    if (!proyecto) {
      res.status(404).json("El proyecto no existe");
      return;
    }

    if (proyecto.creador.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    await ProyectoModel.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Proyecto eliminado!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
