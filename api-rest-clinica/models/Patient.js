
const { Schema, model } = require("mongoose");

const PatientSchema = Schema({

    history_number: {
        type: String,
        require: true
    },

    name: {
        type: String,
        require: true
    },

    surnames: {
        type: String,
        required: true
    },

    nif: {
        type: String,
        required: true
    },

    sex: {
        type: String,
        required: true
    },

    date_birth: {
        type: Date,
        required: true
    },

    odontograma: {
        type: String,
        required: true
    },

    date: {
        type: Date.now(),
        required: true
    },

    active: {
        type: true,
        required: true
    },

    id_contact: {
        type: Schema.ObjectId,
        ref: "Contact"
    },

});


const modelPatient = model("Patient", PatientSchema, "patients");

module.exports = modelPatient