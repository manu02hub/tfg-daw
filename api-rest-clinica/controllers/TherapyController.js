const Therapy = require("../models/Therapy");

const createTherapy = (req, res) => {

    let parametros = req.body;

    const therapyCreate = new Therapy(parametros);

    therapyCreate.save();

    return res.status(200).json({
        state: "success",
        therapy: therapyCreate
    });

}

const getAllTherapies = async (req, res) => {

    const therapies = await Therapy.find({}).exec();

    return res.status(200).json({
        state: "success",
        therapies
    });
}

const getTherapy = async (req, res) => {

    let id = req.params.id;

    const therapyGet = await Therapy.findById(id);

    return res.status(200).json({
        state: "success",
        therapy: therapyGet,
    });
}

const deleteTherapy = async (req, res) => {

    let id = req.params.id;

    await Therapy.findByIdAndDelete(id);

    return res.status(200).json({
        state: "success",
        message: "Terapia eliminada correctamente"
    });

}

const updateTherapy = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;

    const therapyEdit = await Therapy.findByIdAndUpdate(id, parameters, { new: true });

    return res.status(200).json({
        state: "success",
        message: "Terapia editada correctamente",
        therapy: therapyEdit
    });

}

module.exports = {
    createTherapy,
    getAllTherapies,
    deleteTherapy,
    updateTherapy,
    getTherapy
}