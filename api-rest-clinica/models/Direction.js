const { Schema, model } = require("mongoose");

const DirectionSchema = Schema({
    street: {
        type: String,
        require: true
    },

    number: {
        type: String,
        required: true
    },

    flat: {
        type: String,
        required: true
    },

    z_code: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    province: {
        type: String,
        required: true
    },

});

const modelDirection = model("Direction", DirectionSchema, "directions");


module.exports = modelDirection
