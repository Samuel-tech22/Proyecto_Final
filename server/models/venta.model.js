const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const detailProductSchema = new mongoose.Schema({
    cantidad: { type: Number, required: true },
    product: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
    talla: { type: String, required: true },
    price: { type: Number, required: true },
});

const VentaSchema = new mongoose.Schema(
    {
        clientId: {
            type: String,
            required: [true, "client is required"],
        },
        name: {
            type: String,
            required: [true, "name is required"],
        },
        city: {
            type: String,
            required: [true, "city is required"],
        },
        address: {
            type: String,
            required: [true, "address is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
        },
        cel: {
            type: String,
            required: [true, "cel is required"],
        },
        envio: {
            type: Number,
            required: true,
            default: 0
        },
        entrega: {
            type: String,
            required: true,
            enum: ['retiro', 'domicilio'],
            default: 'domicilio'
        },
        estado:
        {
            type: String,
            required: true,
            enum: ['pendiente', 'finalizado', 'cancelado'],
            default: 'pendiente'
        },
        detailProduct: [detailProductSchema],
    }, { timestamps: true, versionKey: false }
);

const Venta = new mongoose.model("Venta", VentaSchema);
module.exports = Venta;

//Función para enviar el correo despues de realizar una venta */

async function enviarCorreoVenta(ventaId) {
    try {
        const venta = await Venta.findById(ventaId).populate("detailProduct.product");

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "gonzalezestefi094@gmail.com",
                pass: "sgdo rbym abhn tbda ",
        }, 
        });

        const mensaje = {
            from: "gonzalezestefi094@gmail.com",
            to: venta.email,
            subject: "Venta realizada exitosamente",
            html: `
            <p>Hola ${venta.name},</p>
            <p>Tu compra se ha realizado con éxito.</p>
            <p>Aquí está la información de tu compra:</p>
            <ul>
                ${venta.detailProduct.map(item => `<li>${item.cantidad} x ${item.product.name} - ${item.price}</li>`).join('')}
            </ul>
            <p>¡Gracias por tu compra!</p>
        `,
        };

        const info = await transporter.sendMail(mensaje);
        console.log("Correo electrónico enviado:",info.response);
    } catch (error) {
        console.error("Error al enviar el correo electronico", error);
    }
}

module.exports = { Venta, enviarCorreoVenta };
