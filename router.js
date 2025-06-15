const controladorProductos = require('./Backend/controller/productos.controller');

const exp = require('express');
const router = exp.Router();

router.get('/productos', controladorProductos.listarProductos)
router.get('/productos', controladorProductos.insertarProductos)
router.get('/productos', controladorProductos.actualizarProductos)
router.get('/productos', controladorProductos.eliminarProductos)

module.exports = router;