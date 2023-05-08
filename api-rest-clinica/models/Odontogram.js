const { Schema, model } = require("mongoose");

const OdontogramSchema = Schema({
    name: {
        type: String,
        required: true,
    },
});

const modelOdontogram = model("Odontogram", OdontogramSchema, "odontograms");

module.exports = modelOdontogram