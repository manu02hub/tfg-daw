const { Schema, model } = require("mongoose");

const Therapy_has_PatientSchema = Schema({
    id_therapy: {
        type: Schema.ObjectId,
        ref: "Therapy",
        require: true
    },

    id_patient: {
        type: Schema.ObjectId,
        ref: "Patient",
        require: true
    },

    id_tooth: {
        type: Schema.ObjectId,
        ref: "Tooth",
        require: true
    },

    complete: {
        type: Boolean,
        default: false,
        require: true
    }

});


const modelTherapy_has_Patient = model("Therapy_has_Patient", Therapy_has_PatientSchema, "therapies_has_patients");

module.exports = modelTherapy_has_Patient