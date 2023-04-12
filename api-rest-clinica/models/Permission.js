const { Schema, model } = require("mongoose");

const PermissionSchema = Schema({
    name: {
        type: String,
        required: true,
    }
})

const modelPermission = model("Permission", PermissionSchema, "permissions");

module.exports = {
    modelPermission,
}