const { Schema, model } = require("mongoose");

const ToothSchema = Schema({
    number: {
        type: Number,
        require: true
    },

    letter: {
        type: String,
        required: true
    },

    img: {
        type: String,
        required: true
    },

    id_odontogram: {
        type: Schema.ObjectId,
        ref: "Odontogram"
    },

});


const modelTooth = model("Tooth", ToothSchema, "teeth");

module.exports = modelTooth