const Therapy_has_Patient = require("../models/Therapy_has_Patient");
const Therapy = require('../models/Therapy');

const createTherapy_has_Patient = async (req, res) => {

    let parametros = req.body;
    let respuesta;
    var therapy_has_patient;

    therapy_has_patient = new Therapy_has_Patient(parametros);
    await therapy_has_patient.save();

    respuesta = res.status(200).json({
        state: "success",
        therapy_has_patient: therapy_has_patient
    });

    return respuesta;

}

// const getAllTherapies = async (req, res) => {

//     const therapies = await Therapy.find({}).exec();

//     return res.status(200).json({
//         state: "success",
//         therapies
//     });
// }

const getTherapy_has_Patient = async (req, res) => {

    let id = req.params.id;

    const therapy_has_patientGet = await Therapy_has_Patient.find({ id_patient: id, complete: false }).sort('id_therapy').populate('id_therapy').exec();

    return res.status(200).json({
        state: "success",
        therapy_has_patient: therapy_has_patientGet,
    });
}

const getTherapy_has_PatientById = async (req, res) => {

    let id = req.params.id;

    const therapy_has_patientGet = await Therapy_has_Patient.findOne({ $and: [{ _id: id }, { complete: false }] }).populate('id_therapy').exec();

    return res.status(200).json({
        state: "success",
        therapy_has_patient: therapy_has_patientGet,
    });
}

const getTherapy_has_PatientComplete = async (req, res) => {

    let id = req.params.id;

    const therapy_has_patientGet = await Therapy_has_Patient.findOne({ $and: [{ _id: id }, { complete: true }] }).populate('id_therapy').exec();

    return res.status(200).json({
        state: "success",
        therapy_has_patient: therapy_has_patientGet,
    });
}

const deleteTherapy_has_Patient = async (req, res) => {

    let id = req.params.id;

    await Therapy_has_Patient.findByIdAndDelete(id);

    return res.status(200).json({
        state: "success",
        message: "Terapia eliminada correctamente"
    });

}

const updateTherapy_has_Patient = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;
    var therapy_has_patient;

    therapy_has_patient = await Therapy_has_Patient.findByIdAndUpdate(id, parameters, { new: true });

    respuesta = res.status(200).json({
        state: "success",
        message: "Terapia editada correctamente",
        therapy_has_patient: therapy_has_patient
    });

    return respuesta;

}

module.exports = {
    createTherapy_has_Patient,
    getTherapy_has_PatientById,
    getTherapy_has_PatientComplete,
    getTherapy_has_Patient,
    updateTherapy_has_Patient,
    deleteTherapy_has_Patient
}