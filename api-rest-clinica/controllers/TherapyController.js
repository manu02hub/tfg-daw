const Therapy = require("../models/Therapy");

const createTherapy = async (req, res) => {

    let parametros = req.body;
    let respuesta;
    var therapy;


    if (parametros.name) {
        therapy = await Therapy.findOne({ name: parametros.name });

        if (therapy) {
            respuesta = res.status(200).json({
                state: "error",
                message: "Ya existe el tratamiento"
            });
        } else {

            therapy = new Therapy(parametros);
            await therapy.save();

            respuesta = res.status(200).json({
                state: "success",
                therapy: therapy
            });
        }
    }

    return respuesta;

}

const getAllTherapies = async (req, res) => {

    const therapies = await Therapy.find({}).exec();

    console.log(therapies);

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
    var therapy;

    therapy = await Therapy.findOne({ name: parameters.name });

    if (therapy) {
        respuesta = res.status(200).json({
            state: "error",
            message: "Ya existe el tratamiento"
        });

    } else {

        therapy = await Therapy.findByIdAndUpdate(id, parameters, { new: true });

        respuesta = res.status(200).json({
            state: "success",
            message: "Terapia editada correctamente",
            therapy: therapy

        });
    }

    return respuesta;

}

module.exports = {
    createTherapy,
    getAllTherapies,
    deleteTherapy,
    updateTherapy,
    getTherapy
}