const Rol = require("../models/Rol");

const getAllRoles = async (req, res) => {

    const roles = await Rol.find({}).populate('id_permissions').exec();

    return res.status(200).json({
        state: "success",
        roles
    });
}

module.exports = {
    getAllRoles
}