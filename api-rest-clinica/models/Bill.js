const { Schema, model } = require("mongoose");

const BillSchema = Schema({
    patient: {
        type: String,
        required: true,
    },

    nif_patient: {
        type: String,
        required: true,
    },

    tooth: {
        type: String,
        required: true,
    },

    therapy: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    IVA: {
        type: Number,
        default: 21,
    },

    discount: {
        type: Number,
        required: true,
    },

    number_bill: {
        type: Number,
        required: true,
    },

    pay_day: {
        type: Date,
        default:""
    },

    is_pay: {
        type: Boolean,
        default: false
    },

    id_therapy_has_patient: {
        type: Schema.ObjectId,
        ref: "Therapy_has_Patient"
    },
});

const modelBill = model("Bill", BillSchema, "bills");

module.exports = modelBill