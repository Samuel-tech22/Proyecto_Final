const mongoose = require("mongoose");

detailProductSchema = new mongoose.Schema({
    cantidad: { type: Number, required: true },
    product: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
    price: { type: Number, required: true },
});

const VentaSchema = new mongoose.Schema(
    {
        clientId: {
            type: String,
            required: [true, "client is required"],
        },
        estado:
        {
            type: String,
            required: true,
            enum: ['pendiente', 'finalizado', 'cancelado'],
        },
        detailProduct: [detailProductSchema],
    }, { timestamps: true, versionKey: false }
);

const Venta = new mongoose.model("Venta", VentaSchema);
module.exports = Venta;

