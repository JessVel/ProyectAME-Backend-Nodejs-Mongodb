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

app.use("/api/usuarios", require("./routes/user_routes"));
app.use("/api/auth", require("./middleware/auth_routes"));
app.use("/api/proyectos", require("./routes/proyecto_routes"));
app.use("/api/tareas", require("./routes/tarea_routes"));

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});
