const { Schema, model } = require("mongoose");

const ContactSchema = Schema({
    email: {
        type: String,
        require: true
    },

    mobile_phone: {
        type: Number,
        required: true
    },

    landline_phone: {
        type: String,
        required: true
    },

});

const modelContact = model("Contact", ContactSchema, "contacts");


module.exports = modelContact