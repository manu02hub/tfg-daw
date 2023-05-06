const Patient = require("../models/Patient");
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

    const patientFind = await Patient.find({ mobile_phone: patientCreate.mobile_phone }).exec();

    if (patientFind.length < 1) {
        await patientCreate.save();
        respuesta = res.status(200).json({
            state: "success",
            patient: patientCreate
        });

    } else {
        respuesta = res.status(200).json({
            state: "error",
            message: "El paciente ya existe"
        });
    }

    return respuesta;

}

const getAllPatients = async (req, res) => {

    //  const allPatients = await Patient.find({}).sort({ date: -1 }).populate('id_rol').exec();
    const patients = await Patient.find({}).sort({ date: -1 });

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

    const patient = await Patient.findOne({ _id: id });

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

    patient = await Patient.findOne({ $and: [{ _id: { $not: { $eq: id } } }, { mobile_phone: parameters.mobile_phone }] });

    if (patient) {
        respuesta = res.status(200).json({
            state: "error",
            message: "Ya existe un paciente con ese número de teléfono",
        });
    } else {

        patient = await Patient.findByIdAndUpdate(id, parameters, { new: true });

        respuesta = res.status(200).json({
            state: "success",
            message: "Clinica editada correctamente",
            patient: patient
        });
    }

    return respuesta;

}


const deletePatient = async (req, res) => {

    var usuariosClinicas;
    let id = req.params.id;
    let parameters = req.body;
    let equal;
    let respuesta;

    const user = await User.findOne({ _id: parameters.id });

    if (user) {
        equal = bycrypt.compareSync(parameters.password, user.password);

        if (equal) {

            await Patient.findByIdAndDelete(id);

            respuesta = res.status(200).json({
                state: "success",
                message: "Paciente eliminado correctamente",
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
module.exports = {
    getAllPatients,
    createPatient,
    getPatient,
    updatePatient,
    deletePatient
}