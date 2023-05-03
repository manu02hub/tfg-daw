const { Schema, model } = require("mongoose");

const CabinetSchema = Schema({
    reference: {
        type: String,
        required: true,
    },
    id_clinic:{
        type: Schema.ObjectId,
        ref: "Clinic"
    }
});

const modelCabinet = model("Cabinet", CabinetSchema, "cabinets");

module.exports = modelCabinet
