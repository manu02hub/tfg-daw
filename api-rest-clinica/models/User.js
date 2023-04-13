
const { Schema, model } = require("mongoose");
const moongosePaginate = require("mongoose-paginate-v2");
//populate

const UserSchema = Schema({
    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },

    id_rol: {
        type: Schema.ObjectId,
        ref: "Rol"
    },

    id_clinic: {
        type: Schema.ObjectId,
        ref: "Clinic"
    }

});

UserSchema.plugin(moongosePaginate);

const modelUser = model("User", UserSchema, "users");

modelUser.paginate({}, 5 , 10);

module.exports = modelUser