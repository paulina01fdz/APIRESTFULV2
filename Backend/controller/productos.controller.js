const modeloProducto = require('../models/productos.models');

exports.listarProductos = async (req, res) => {
  let listaProductos = await modeloProducto.find();
  if (listaProductos) {
    res.status(200).json(listaProductos); // Si se encuentran productos, devuelve la lista
  } else {
    res.status(404).json({ mensaje: "No se puedo ejecutar la acción" }); // Si no hay productos, devuelve un mensaje de error
  }
};

exports.insertarProductos = async (req, res) => {
  const nuevoProducto = new modeloProducto({
    referencia: req.body.referencia,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock,
    imagen: req.body.imagen,
    habilitado: req.body.habilitado,
  });

  nuevoProducto
    .save()
    .then((producto) => {
      console.log("Producto creado: ", producto);
      res.status(201).json({ mensaje: "Producto registrado exitosamente", producto });
    })
    .catch((err) => {
      console.log("Error al crear producto: ", err);
      res.status(500).json({ mensaje: "Error al registrar producto", detalle: err.message });
    });
};

exports.actualizarProductos = async (req, res) => {
  const productoActualizado = {
    referencia: req.params.ref,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock,
    imagen: req.body.imagen,
    habilitado: req.body.habilitado,
  };

  let actualizacionProducto = await modeloProducto.findOneAndUpdate(
    { referencia: req.params.ref },
    productoActualizado
  );

  if (actualizacionProducto) {
    res.status(200).json({ mensaje: "Producto actualizado correctamente" });
  } else {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  }
};


exports.eliminarProductos = async (req, res) => {
  console.log(req.params.ref, req.body.referencia);
  let productoEliminado = await modeloProducto.findOneAndDelete({
    referencia: req.params.ref,
  });

  if (productoEliminado) {
    res.status(200).json({ mensaje: "Producto eliminado correctamente" });
  } else {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  }
};
