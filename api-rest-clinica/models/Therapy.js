const { Schema, model } = require("mongoose");

const TherapySchema = Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        require: true
    }
});

const modelTherapy = model("Therapy", TherapySchema, "therapies");

module.exports = modelTherapy