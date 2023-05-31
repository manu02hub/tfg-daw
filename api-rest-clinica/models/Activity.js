const { Schema, model } = require("mongoose");

const ActivitySchema = Schema({
    message: {
        type: String,
        required: true,
    },

    action: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    id_user: {
        type: Schema.ObjectId,
        ref: "User"
    },

    id_clinic: {
        type: Schema.ObjectId,
        ref: "Clinic"
    },
   
});

const modelActivity = model("Activity", ActivitySchema, "activities");

module.exports = modelActivity