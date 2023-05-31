const Clinic = require("../models/Clinic");
const User = require("../models/User");
const bycrypt = require("bcrypt");

const createClinic = async (req, res) => {

    var clinica
    let respuesta;
    let parametros = req.body;

    clinica = await Clinic.findOne({ direction: parametros.direction });

    if (clinica) {

        respuesta = res.status(200).json({
            state: "error",
            message: "Ya hay una clinica con esa dirección"
        });
    } else {

        clinica = new Clinic(parametros);
        await clinica.save();

        respuesta = res.status(200).json({
            state: "success",
            clinic: clinica
        });
    }

    return respuesta;

}

const getAllClinics = async (req, res) => {

    const clinics = await Clinic.find({}).exec();

    return res.status(200).json({
        state: "success",
        clinics
    });
}

const getClinic = async (req, res) => {

    let id = req.params.id;

    const clinicGet = await Clinic.findById(id);

    return res.status(200).json({
        state: "success",
        clinic: clinicGet,
    });
}

const searchClinic = async (req, res) => {

    let direction = req.params.direction;
    let clinics;

    if (direction !== "") {
        clinics = await Clinic.find({ direction: { $regex: direction, $options: 'i' } });
    }

    return res.status(200).json({
        state: "success",
        clinics,
    });
}

const deleteClinic = async (req, res) => {

    var usuariosClinicas;
    let id = req.params.id;
    let parameters = req.body;
    let equal;
    let respuesta;
    let clinic;

    const user = await User.findOne({ _id: parameters.id });

    if (user) {
        equal = bycrypt.compareSync(parameters.password, user.password);

        if (equal) {


            usuariosClinicas = await User.findOne({ id_clinic: id });

            if (usuariosClinicas) {

                respuesta = res.status(200).json({
                    state: "error",
                    message: "No se puede eliminar la clinica, tienes usuarios asociados",
                });

            } else {

                clinic = await Clinic.findByIdAndDelete(id);

                respuesta = res.status(200).json({
                    state: "success",
                    message: "Clinica eliminada correctamente",
                    clinic: clinic
                });
            }


        } else {
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

const updateClinic = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;
    let respuesta;
    var clinic;

    clinic = await Clinic.findOne({ $and: [{ _id: { $not: { $eq: id } } }, { direction: parameters.direction }] });

    if (clinic) {
        respuesta = res.status(200).json({
            state: "error",
            message: "Ya existe una clinic con esa dirección",
        });
    } else {

        clinic = await Clinic.findByIdAndUpdate(id, parameters, { new: true });

        respuesta = res.status(200).json({
            state: "success",
            message: "Clinica editada correctamente",
            clinic: clinic
        });
    }

    return respuesta;

}

module.exports = {
    createClinic,
    getAllClinics,
    deleteClinic,
    updateClinic,
    getClinic,
    searchClinic
}