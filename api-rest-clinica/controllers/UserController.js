const User = require("../models/User");
const bycrypt = require("bcrypt");
const jwt = require("../services/jwt");
const Rol = require('../models/Rol');
const moongosePaginate = require("mongoose-paginate-v2");

const pruebaUser = (req, res) => {
    res.status(200).json({
        state: "success",
        usuario: req.user
    })
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
            state: "success",
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
            respuesta = res.status(400).json({
                state: "success",
                message: "No te has identificado correctamente"
            });
        } else {

            token = jwt.createToken(userFind);

            respuesta = res.status(200).json({
                state: "success",
                message: "Acceso a login",
                user: userFind,
                token
            });
        }

    } else {
        respuesta = res.status(400).json({
            state: "success",
            message: "El usuario no existe"
        });
    }

    return respuesta;

}

const getAllUsers = async (req, res) => {

    const allUsers = await User.find().sort({ date: -1 }).populate('id_rol').exec();

    return res.status(200).json({
        state: "sucess",
        allUsers,
    });
}

const getUsersClinic = async (req, res) => {

    const id = req.params.clinic;

    const usersClinic = await User.find({ id_clinic: id }).exec();

    return res.status(200).json({
        state: "sucess",
        usersClinic,
    });

}

const editUser = async (req, res) => {

    const id = req.params.id;

    const user = await User.findOne({ _id: id });

    return res.status(200).json({
        state: "sucess",
        user,
    });

}

const updateUser = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;
    let user = req.user;
    let pass;
    let respuesta;

    delete user.iat;
    delete user.exp;
    delete user.date;

    //Encontrar user
    // { _id: { $not: {$eq: ObjectId("6437dbb72da4067593ea32ed") } } }

    // {$and: [{ _id: { $not: {$eq: ObjectId("64382c2fc7584cd90e86de17") } } }, {email:"manuel@gmail.com"} ]}

    const userFind = await User.findOne({$and: [{ _id: { $not: {$eq: id } } }, {email: parameters.email} ]});

    if (userFind) {

        respuesta = res.status(200).json({
            state: "success",
            message: "El usuario ya existe"
        });


    } else {

        if (user.password) {
            pass = await bycrypt.hash(parameters.password, 10);
            parameters.password = pass;
        }

        const userUpdate = await User.findByIdAndUpdate(id, parameters, { new: true });

        respuesta = res.status(200).json({
            state: "sucess",
            message: "Usuario editado correctamente",
            user: userUpdate
        });
    }

    return respuesta;
}

const deleteUser = async (req, res) => {
    let id = req.params.id;

    await User.findByIdAndDelete(id);

    return res.status(200).json({
        state: "sucess",
        message: "Usuario eliminado correctamente",
    });
}

module.exports = {
    pruebaUser,
    createUser,
    login,
    getAllUsers,
    getUsersClinic,
    editUser,
    updateUser,
    deleteUser
}