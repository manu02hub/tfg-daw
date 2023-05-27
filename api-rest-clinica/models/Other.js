const { Schema, model } = require("mongoose");

const OtherSchema = Schema({
    diseases: {
        type: String,
        required: true,
    },

    allergies: {
        type: String,
        required: true,
    },
});

const modelOther = model("Other", OtherSchema, "others");

module.exports = modelOther