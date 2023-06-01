const Patient = require("../models/Patient");
const Contact = require("../models/Contact");
const Direction = require("../models/Direction");
const User = require("../models/User");
const bycrypt = require("bcrypt");
const CryptoJS = require("crypto-js");

const createPatient = async (req, res) => {
    
    let patient;
    let increment;
    let parameters = req.body;
    let respuesta;

    parameters.name = CryptoJS.AES.encrypt(JSON.stringify(parameters.name), 'ToothSensation2023').toString();
    parameters.surnames = CryptoJS.AES.encrypt(JSON.stringify(parameters.surnames), 'ToothSensation2023').toString();
    parameters.gender = CryptoJS.AES.encrypt(JSON.stringify(parameters.gender), 'ToothSensation2023').toString();
    parameters.date_birth = CryptoJS.AES.encrypt(JSON.stringify(parameters.date_birth), 'ToothSensation2023').toString();

    patient = await Patient.find({}).sort({ history_number: 'desc' }).limit(1).exec();

    if (patient.length >= 1) {

        increment = Number.parseInt(patient[0].history_number) + 1;
        parameters.history_number = increment;

    }

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
    var bytes;
    const id = req.params.id;

    //  const allPatients = await Patient.find({}).sort({ date: -1 }).populate('id_rol').exec();
    const patients = await Patient.find({ $and: [{ id_clinic: id }, { active: true }] }).sort({ date: -1 }).populate('id_contact');

    if (patients.length > 0) {

        patients.forEach(element => {
            bytes = CryptoJS.AES.decrypt(element.name, 'ToothSensation2023');
            element.name = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            bytes = CryptoJS.AES.decrypt(element.surnames, 'ToothSensation2023');
            element.surnames = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            bytes = CryptoJS.AES.decrypt(element.gender, 'ToothSensation2023');
            element.gender = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            bytes = CryptoJS.AES.decrypt(element.date_birth, 'ToothSensation2023');
            element.date_birth = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        });
    }


    return res.status(200).json({
        state: "success",
        patients,
    });
}


const getPatient = async (req, res) => {

    var bytes;
    const id = req.params.id;

    const patient = await Patient.findOne({ _id: id }).populate('id_direction');

    if (patient._id) {
        bytes = CryptoJS.AES.decrypt(patient.name, 'ToothSensation2023');
        patient.name = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(patient.surnames, 'ToothSensation2023');
        patient.surnames = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(patient.gender, 'ToothSensation2023');
        patient.gender = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(patient.date_birth, 'ToothSensation2023');
        patient.date_birth = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(patient.id_direction.street, 'ToothSensation2023');
        patient.id_direction.street = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(patient.id_direction.number, 'ToothSensation2023');
        patient.id_direction.number = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(patient.id_direction.flat, 'ToothSensation2023');
        patient.id_direction.flat = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(patient.id_direction.z_code, 'ToothSensation2023');
        patient.id_direction.z_code = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(patient.id_direction.city, 'ToothSensation2023');
        patient.id_direction.city = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(patient.id_direction.province, 'ToothSensation2023');
        patient.id_direction.province = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }


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

    parameters.name = CryptoJS.AES.encrypt(JSON.stringify(parameters.name), 'ToothSensation2023').toString();
    parameters.surnames = CryptoJS.AES.encrypt(JSON.stringify(parameters.surnames), 'ToothSensation2023').toString();
    parameters.gender = CryptoJS.AES.encrypt(JSON.stringify(parameters.gender), 'ToothSensation2023').toString();
    parameters.date_birth = CryptoJS.AES.encrypt(JSON.stringify(parameters.date_birth), 'ToothSensation2023').toString();

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

    var bytes;
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
        patients = await Patient.find({ $and: [{ nif: { $regex: aux.nif, $options: 'i' } }, { active: true }] }).sort({ date: -1 }).populate('id_contact').exec();

        if (patients.length > 0) {

            patients.forEach(element => {
                bytes = CryptoJS.AES.decrypt(element.name, 'ToothSensation2023');
                element.name = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                bytes = CryptoJS.AES.decrypt(element.surnames, 'ToothSensation2023');
                element.surnames = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                bytes = CryptoJS.AES.decrypt(element.gender, 'ToothSensation2023');
                element.gender = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                bytes = CryptoJS.AES.decrypt(element.date_birth, 'ToothSensation2023');
                element.date_birth = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            });
        }

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