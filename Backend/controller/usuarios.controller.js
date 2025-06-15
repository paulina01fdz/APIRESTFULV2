const modeloUsuario = require('../models/usuarios.models');

app.get("/usuarios", async (req, res) => {
  let listaUsuarios = await modeloUsuario.find();
  if (listaUsuarios) res.status(200).json(listaUsuarios);
  // Define una ruta GET para obtener todos los usuarios
  else res.status(404).json({ mensaje: "No se encontraron usuarios" }); // Si no hay usuarios, devuelve un mensaje de error
});

app.get("/usuarios/:documentoUsuario", async (req, res) => {
  let documentoEncontrado = await modeloUsuario.findOne({
    documento: req.params.documentoUsuario,
  }); //referencia:req.params.ref hace referencia al parámetro de la URL
  if (documentoEncontrado) {
    res.status(200).json(documentoEncontrado); // Si se encuentra el usuario, devuelve sus datos
  } else {
    res.status(404).json({ error: "No se puedo ejecutar la acción" }); // Si no se encuentra, devuelve un mensaje de error
  }
});

app.post("/usuarios", async (req, res) => {
  const nuevoUsuario = new modeloUsuario({
    documento: req.body.documento,
    nombreCompleto: req.body.nombreCompleto,
    FNacimiento: req.body.FNacimiento,
  });

  nuevoUsuario
    .save()
    .then((usuario) => {
      console.log("Cliente creado: ", usuario);
    })
    .catch((err) => {
      console.log("Error al crear cliente: ", err);
    });
  res.json("Registro exitoso");
});

app.put("/usuarios/:ref", async (req, res) => {
  const usuarioActualizado = {
    documento: req.params.ref,
    nombreCompleto: req.body.nombreCompleto,
    FNacimiento: req.body.FNacimiento,
    //body: req.body es un objeto que contiene los datos del usuario a actualizar
  };
  let Actualizacion = await modeloUsuario.findOneAndUpdate(
    { documento: req.params.ref },
    usuarioActualizado
  );
  if (Actualizacion) {
    res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
  } else {
    res.status(404).json({ mensaje: "Usuario no encontrado" });
  }
});

app.delete("/usuarios/:id", async (req, res) => {
  /*console.log(req.params.id, req.body.documento);*/
  let usuarioEliminado = await modeloUsuario.findOneAndDelete({
    _id: req.params.id,
  });
  if (usuarioEliminado) {
    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } else {
    res.status(404).json({ mensaje: "Usuario no encontrado" });
  }
});

