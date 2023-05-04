const { Schema, model } = require("mongoose");

const DirectionSchema = Schema({
    street: {
        type: String,
        require: true
    },

    number: {
        type: Number,
        required: true
    },

    flat: {
        type: String,
        required: true
    },

    z_postal: {
        type: Number,
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

    date: {
        type: Date,
        default: Date.now()
    }

});

const modelDirection = model("Direction", DirectionSchema, "directions");


module.exports = modelDirection
