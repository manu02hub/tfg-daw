
const { Schema, model } = require("mongoose");

const PatientSchema = Schema({

    history_number: {
        type: Number,
        default: 000001
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
        type: Date,
        required: true
    },

    odontogram: {
        type: Number,
        required: false
    },

    mobile_phone: {
        type: Number,
        required: true
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
        default:null
    },

    id_contact: {
        type: Schema.ObjectId,
        ref: "Contact",
        default:null
    },

    tutors: [{
        type: Schema.ObjectId,
        ref: "Tutor",
        default:null
    }],

});


const modelPatient = model("Patient", PatientSchema, "patients");

module.exports = modelPatient