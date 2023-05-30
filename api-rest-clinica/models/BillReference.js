const { Schema, model } = require("mongoose");

const BillReferenceSchema = Schema({
    reference: {
        type: Number,
        required: true,
    },

    total: {
        type: Number,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now()
    },

    id_patient: {
        type: Schema.ObjectId,
        ref: "Patient"
    },

    id_clinic: {
        type: Schema.ObjectId,
        ref: "Clinic"
    },

    active:{
        type: Boolean,
        default: true
    },
});

const modelBillReference = model("BillReference", BillReferenceSchema, "billreferences");

module.exports = modelBillReference