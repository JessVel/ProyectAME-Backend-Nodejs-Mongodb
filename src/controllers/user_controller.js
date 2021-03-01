const UserModel = require("../models/user_model");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  //Revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Exraer email y password
  const { user, email, password } = req.body;

  try {
    //Revisar que el usuario registrado sea unico
    let user = await UserModel.findOne({ email });

    //Validar si existe el usuario
    if (user) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    //Crear modelo con datos del usuario creado
    user = new UserModel(req.body);

    //Hashear password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    //Guardar usuario
    await user.save();

    //Crear y firmar el JWT
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.CLAVE_SECRETA,
      {
        expiresIn: 3600, //1 hora
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Hubo un error al crear el usuario" });
  }
};
