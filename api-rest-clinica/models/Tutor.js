
const { Schema, model } = require("mongoose");

const TutorSchema = Schema({
    name: {
        type: String,
        require: true
    },

    surnames: {
        type: String,
        required: true
    },

    id_contact: {
        type: Schema.ObjectId,
        ref: "Contact"
    },

});


const modelTutor = model("Tutor", TutorSchema, "tutors");

module.exports = modelTutor