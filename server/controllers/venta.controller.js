const Venta = require('../models/venta.model');

const crearVenta = async (req, res) => {
    try {
        const nuevaVenta = new Venta(req.body);
        const ventaGuardada = await nuevaVenta.save();
        res.status(201).json(ventaGuardada);
    } catch (error) {
        console.error(error);
    }
};

const obtenerVenta = async (req, res) => {
    try {
        const venta = await Venta.findById(req.params.id).populate('productos');
        if (!venta) {
            return res.status(404).json({ mensaje: 'Venta no encontrada' });
        }
        res.json(venta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};

const obtenertodaslasVentas = async (req, res) => {
    try {
        const ventas = await Venta.find().populate('productos');
        res.status(200).json(ventas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};


const obtenerVentaPorCliente = async (req, res) => {
    try {
        const clienteId = req.params.clienteId;
        const venta = await Venta.findOne({ cliente: clienteId }).populate('productos');
        if (!venta) {
            return res.status(404).json({ mensaje: 'Venta no encontrada para este cliente' });
        }
        res.json(venta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};

module.exports = {
    crearVenta,
    obtenerVenta,
    obtenertodaslasVentas,
    obtenerVentaPorCliente
};