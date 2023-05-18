
const { Schema, model } = require("mongoose");

const DayBlockedSchema = Schema({

    date: {
        type: Date,
        require: true
    },

    id_clinic: {
        type: Schema.ObjectId,
        ref: "Clinic",
        required: true
    },

});


const modelDayBlocked = model("DayBlocked", DayBlockedSchema, "days_blocked");

module.exports = modelDayBlocked