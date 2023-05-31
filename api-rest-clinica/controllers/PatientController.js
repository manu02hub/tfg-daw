const Patient = require("../models/Patient");
const Contact = require("../models/Contact");
const Direction = require("../models/Direction");
const User = require("../models/User");
const bycrypt = require("bcrypt");
// const getUser = async (req, res) => {
//     const id = req.params.id;

//     const user = await User.findOne({ _id: id });
//     const permissionsUser = await Rol.findOne({ _id: user.id_rol }).populate('id_permissions');

//     return res.status(200).json({
//         state: "success",
//         user: {
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             id_clinic: user.id_clinic,
//             id_rol: user.id_rol,
//             name_rol: permissionsUser.name,
//             permissions: permissionsUser.id_permissions,
//         },
//     });
// }

const createPatient = async (req, res) => {
    let parameters = req.body;
    let respuesta;

    //Validar?

    // let patientCrypt = await bycrypt.hash(parameters, 10);


    const patientCreate = new Patient(parameters);

    // const patientFind = await Patient.find({ mobile_phone: patientCreate.mobile_phone }).exec();

    await patientCreate.save();
    respuesta = res.status(200).json({
        state: "success",
        patient: patientCreate
    });




    return respuesta;

}

const getAllPatients = async (req, res) => {

    const id = req.params.id;

    //  const allPatients = await Patient.find({}).sort({ date: -1 }).populate('id_rol').exec();
    const patients = await Patient.find({ $and: [{ id_clinic: id }, { active: true }] }).sort({ date: -1 }).populate('id_contact');

    return res.status(200).json({
        state: "success",
        patients,
    });
}

// const getUsersClinic = async (req, res) => {

//     const id_clinic = req.params.clinic;
//     const id = req.params.id;

//     const allUsers = await User.find({ $and: [{ _id: { $not: { $eq: id } } }, { id_clinic: id_clinic }] }).populate('id_rol').exec();

//     return res.status(200).json({
//         state: "success",
//         allUsers,
//     });

// }

const getPatient = async (req, res) => {

    const id = req.params.id;

    const patient = await Patient.findOne({ _id: id }).populate('id_direction');

    return res.status(200).json({
        state: "success",
        patient,
    });

}

const updatePatient = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;
    let respuesta;
    var patient;

    // patient = await Patient.findOne({ $and: [{ _id: { $not: { $eq: id } } }, { mobile_phone: parameters.mobile_phone }] });

    // if (patient) {
    //     respuesta = res.status(200).json({
    //         state: "error",
    //         message: "Ya existe un paciente con ese número de teléfono",
    //     });
    // } else {

    patient = await Patient.findByIdAndUpdate(id, parameters, { new: true });

    respuesta = res.status(200).json({
        state: "success",
        message: "Clinica editada correctamente",
        patient: patient
    });
    // }

    return respuesta;

}


const deletePatient = async (req, res) => {

    var usuariosClinicas;
    let id = req.params.id;
    let parameters = req.body;
    let equal;
    let respuesta;
    let patientDelete;

    const user = await User.findOne({ _id: parameters.id });

    if (user) {
        equal = bycrypt.compareSync(parameters.password, user.password);

        if (equal) {

            patientDelete = await Patient.findByIdAndUpdate(id, { active: false }, { new: true });

            respuesta = res.status(200).json({
                state: "success",
                message: "Paciente eliminado correctamente",
                patient: patientDelete
            });


            // usuariosClinicas = await User.findOne({ id_clinic: id });

            // if (usuariosClinicas) {

            //     respuesta = res.status(200).json({
            //         state: "error",
            //         message: "No se puede eliminar la clinica, tienes usuarios asociados",
            //     });

            // } else {

            //     await Patient.findByIdAndDelete(id);

            //     respuesta = res.status(200).json({
            //         state: "success",
            //         message: "Paciente eliminado correctamente",
            //     });
            // }


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

const searchNIFphone = async (req, res) => {

    let patient;
    let data = req.params.data;

    if (data) {
        patient = await Patient.findOne({ $and: [{ id_contact: data }, { active: true }] });

        if (patient) {
            respuesta = res.status(200).json({
                state: "success",
                message: "Encontrado",
                patient: {
                    _id: patient._id,
                    name: patient.name,
                    surnames: patient.surnames
                }
            });

        } else {
            respuesta = res.status(200).json({
                state: "error",
                message: "No existe el paciente",
            });
        }

    } else {
        respuesta = res.status(200).json({
            state: "error",
            message: "El campo no puede estar vacio",
        });
    }
}


const searchPatient = async (req, res) => {

    let data = req.params.data;
    let patients;

    if (data !== "") {
        patients = await Patient.find({ $and: [{ nif: { $regex: data, $options: 'i' } }, { active: true }] }).sort({ date: -1 }).populate('id_contact').exec();
    }

    return res.status(200).json({
        state: "success",
        patients,
    });
}

module.exports = {
    getAllPatients,
    createPatient,
    getPatient,
    updatePatient,
    deletePatient,
    searchNIFphone,
    searchPatient
}