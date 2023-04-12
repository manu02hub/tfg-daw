const Clinic = require("../models/Clinic");

const createClinic = (req, res) => {

    let parametros = req.body;

    const cliniCreate = new Clinic(parametros);

    cliniCreate.save();

    return res.status(200).json({
        state: "success",
        clinic: cliniCreate
    })

}

const getAllClinics = async (req, res) => {

    const clinics = await Clinic.find({}).exec();

    return res.status(200).json({
        state: "sucess",
        clinics
    })
}

const getClinic = async (req, res) => {

    let id = req.params.id;

    const clinicGet = await Clinic.findById(id);

    return res.status(200).json({
        state: "sucess",
        clinic: clinicGet,
    });
}

const deleteClinic = async (req, res) => {

    let id = req.params.id;

    await Clinic.findByIdAndDelete(id);

    return res.status(200).json({
        state: "sucess",
        message: "Clinica eliminada correctamente"
    });

}

const updateClinic = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;

    const clinicEdit = await Clinic.findByIdAndUpdate(id, parameters, { new: true });

    return res.status(200).json({
        state: "sucess",
        message: "Clinica editada correctamente",
        clinic: clinicEdit
    });

}

module.exports = {
    createClinic,
    getAllClinics,
    deleteClinic,
    updateClinic,
    getClinic
}