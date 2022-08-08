const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/contact");

// configuración
const app = express();
const port = process.env.PORT || 9000;
app.use(express.urlencoded({ extended: true }));
// middleware
app.use(express.json());
app.use("/", userRoute);

// ruta raiz
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// conexión a mongodb 
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((error) => console.error(error));

// puerto del servidor
app.listen(port, () => console.log("el puerto del servidor es:", port));
