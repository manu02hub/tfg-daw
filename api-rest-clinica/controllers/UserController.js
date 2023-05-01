const User = require("../models/User");
const bycrypt = require("bcrypt");
const jwt = require("../services/jwt");
const Rol = require('../models/Rol');
const Permission = require("../models/Permission");
const moongosePaginate = require("mongoose-paginate-v2");

const pruebaUser = (req, res) => {
    res.status(200).json({
        state: "success",
        usuario: req.user
    })
}

const getUser = async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({ _id: id });
    const permissionsUser = await Rol.findOne({ _id: user.id_rol }).populate('id_permissions');

    return res.status(200).json({
        state: "success",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            id_clinic: user.id_clinic,
            id_rol: user.id_rol,
            name_rol: permissionsUser.name,
            permissions: permissionsUser.id_permissions,
        },
    });
}

const createUser = async (req, res) => {
    let parameters = req.body;
    let respuesta;

    //Validar?

    let pass = await bycrypt.hash(parameters.password, 10);
    parameters.password = pass;

    const userCreate = new User(parameters);

    const userFind = await User.find({ email: userCreate.email.toLowerCase() }).exec();

    if (userFind.length < 1) {
        await userCreate.save();
        respuesta = res.status(200).json({
            state: "success",
            user: userCreate
        });

    } else {
        respuesta = res.status(200).json({
            state: "error",
            message: "El usuario ya existe"
        });
    }

    return respuesta;

}

const login = async (req, res) => {
    let parameters = req.body;
    let respuesta;
    let pass;
    let token;

    //Encontrar user
    const userFind = await User.findOne({ email: parameters.email });


    if (userFind) {

        pass = bycrypt.compareSync(parameters.password, userFind.password);

        if (!pass) {
            respuesta = res.status(200).json({
                state: "error",
                message: "No te has identificado correctamente"
            });
        } else {

            token = jwt.createToken(userFind);

            const permissionsUser = await Rol.findOne({ _id: userFind.id_rol }).populate('id_permissions');

            respuesta = res.status(200).json({
                state: "success",
                message: "Acceso a login",
                user: {
                    _id: userFind._id,
                    name: userFind.name,
                    email: userFind.email,
                    id_clinic: userFind.id_clinic,
                    id_rol: userFind.id_rol,
                    name_rol: permissionsUser.name,
                    permissions: permissionsUser.id_permissions,
                },
                token,
            });
        }

    } else {
        respuesta = res.status(400).json({
            state: "error",
            message: "El usuario no existe"
        });
    }

    return respuesta;

}

const getAllUsers = async (req, res) => {

    const id = req.params.id;

    const allUsers = await User.find({ _id: { $not: { $eq: id } } }).sort({ date: -1 }).populate('id_rol').exec();

    return res.status(200).json({
        state: "success",
        allUsers,
    });
}

const getUsersClinic = async (req, res) => {

    const id_clinic = req.params.clinic;
    const id = req.params.id;

    const allUsers = await User.find({ $and: [{ _id: { $not: { $eq: id } } }, { id_clinic: id_clinic }] }).populate('id_rol').exec();

    return res.status(200).json({
        state: "success",
        allUsers,
    });

}

const editUser = async (req, res) => {

    const id = req.params.id;

    const user = await User.findOne({ _id: id });

    return res.status(200).json({
        state: "success",
        user,
    });

}

const updateUser = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;
    let user = req.user;
    let pass;
    let respuesta;
    let equal;

    delete user.iat;
    delete user.exp;
    delete user.date;

    if (parameters.email) {
        var userFind = await User.findOne({ $and: [{ _id: { $not: { $eq: id } } }, { email: parameters.email }] });


        if (userFind) {

            respuesta = res.status(200).json({
                state: "error",
                message: "El usuario ya existe"
            });

        } else {

            const userUpdate = await User.findByIdAndUpdate(id, parameters, { new: true });

            respuesta = res.status(200).json({
                state: "success",
                message: "Usuario editado correctamente",
                user: userUpdate
            });
        }
    }


    if (parameters.current) {
        var userPass = await User.findOne({ _id: id });
        equal = bycrypt.compareSync(parameters.current, userPass.password);


        if (!equal) {
            respuesta = res.status(200).json({
                state: "error",
                message: "La contraseña no es correcta",
            });
        } else {

            if (parameters.password) {
                pass = await bycrypt.hash(parameters.password, 10);
                parameters.password = pass;

                const userUpdate = await User.findByIdAndUpdate(id, parameters, { new: true });

                respuesta = res.status(200).json({
                    state: "success",
                    message: "Usuario editado correctamente",
                    user: userUpdate
                });
            }
        }
    }

    if (!parameters.email && !parameters.current) {

        pass = await bycrypt.hash(parameters.password, 10);
        parameters.password = pass;

        const userUpdate = await User.findByIdAndUpdate(id, parameters, { new: true });

        respuesta = res.status(200).json({
            state: "success",
            message: "Usuario editado correctamente",
            user: userUpdate
        });
    }

    return respuesta;
}

const deleteUser = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;
    let equal;
    let respuesta;

    const user = await User.findOne({ _id: parameters.id });

    console.log(user);

    if (user) {
        equal = bycrypt.compareSync(parameters.password, user.password);

        if (equal) {
            await User.findByIdAndDelete(id);

            respuesta = res.status(200).json({
                state: "success",
                message: "Usuario eliminado correctamente",
            });
        }else{
            respuesta = res.status(200).json({
                state: "error",
                message: "La contraseña no es correcta",
            });
        }
    } else {

        respuesta = res.status(200).json({
            state: "error",
            message: "No se encuentra al usuario",
        });
    }

    return respuesta;
}

module.exports = {
    getUser,
    pruebaUser,
    createUser,
    login,
    getAllUsers,
    getUsersClinic,
    editUser,
    updateUser,
    deleteUser
}