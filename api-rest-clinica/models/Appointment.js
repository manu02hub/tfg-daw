const { Schema, model } = require("mongoose");

const AppointmentSchema = Schema({
    
    id_therapy_has_patient: [{
        type: Schema.ObjectId,
        ref: "Therapy_has_Patient",
        require: true
    }],

    id_user: {
        type: Schema.ObjectId,
        ref: "User",
        require: true
    },

    id_cabinet: {
        type: Schema.ObjectId,
        ref: "Cabinet",
        require: true
    },

    date: {
        type: Date,
        require: true
    }

});


const modelAppointment = model("Appointment", AppointmentSchema, "appointments");

module.exports = modelAppointment