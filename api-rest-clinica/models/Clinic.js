const { Schema, model } = require("mongoose");

const ClinicSchema = Schema({
    name: {
        type: String,
        require: true
    },

    direction: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    c_postal: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    }

});

const modelClinic = model("Clinic", ClinicSchema, "clinics");


module.exports = modelClinic
