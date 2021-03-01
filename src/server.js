const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

connectDB();

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 4000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With, Accept");
  next();
});

app.use("/api/usuarios", require("./routes/user_routes"));
app.use("/api/auth", require("./middleware/auth_routes"));
app.use("/api/proyectos", require("./routes/proyecto_routes"));
app.use("/api/tareas", require("./routes/tarea_routes"));

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});
