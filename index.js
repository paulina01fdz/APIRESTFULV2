const exp = require('express');
const app = exp();
require("dotenv").config();
const enrutador = require('./router');

app.use(exp.urlencoded({ extended: false })); // Configura express para que pueda recibir datos en formato URL-encoded
app.use(exp.json()); // Configura express para que pueda recibir datos en formato JSON
app.use('/V2', enrutador)

app.listen(process.env.PORT, () => {
  console.log("Servidor en linea");
});