const { Schema, model } = require("mongoose");

const RolSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    id_permissions:[{
        type: Schema.ObjectId,
        ref: "Permission"
    }]
});

const modelRol = model("Rol", RolSchema, "roles");

module.exports = modelRol
