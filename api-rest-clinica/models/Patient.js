
const { Schema, model } = require("mongoose");

const PatientSchema = Schema({

    history_number: {
        type: Number,
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

    gender: {
        type: String,
        required: true
    },

    date_birth: {
        type: String,
        required: true
    },

    odontogram: {
        type: Schema.ObjectId,
        ref: "Odontogram",
    },

    date: {
        type: Date,
        default: Date.now()
    },

    active: {
        type: Boolean,
        default: true
    },

    id_direction: {
        type: Schema.ObjectId,
        ref: "Direction",
    },

    id_contact: {
        type: Schema.ObjectId,
        ref: "Contact",
    },

    id_other: {
        type: Schema.ObjectId,
        ref: "Contact",
    },

    tutors: [{
        type: Schema.ObjectId,
        ref: "Tutor",
    }],

    id_clinic: {
        type: Schema.ObjectId,
        ref: "Clinic",
    },

});


const modelPatient = model("Patient", PatientSchema, "patients");

module.exports = modelPatient