const Therapy = require("../models/Therapy");
const Therapy_has_Patient = require("../models/Therapy_has_Patient");

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

const searchTherapy = async (req, res) => {

    let name = req.params.name;
    let therapies;

    if (name !== "") {
        therapies = await Therapy.find({ name: { $regex: name, $options: 'i' } });
    }

    return res.status(200).json({
        state: "success",
        therapies,
    });
}

const deleteTherapy = async (req, res) => {

    let id = req.params.id;
    let respuesta;
    let therapy;

    const tp = await Therapy_has_Patient.findOne({ id_therapy: id });

    if (tp) {
        respuesta = res.status(200).json({
            state: "error",
            message: "Este tratamiento esta asignado a pacientes",
        });

    } else {
        therapy = await Therapy.findByIdAndDelete(id);

        respuesta = res.status(200).json({
            state: "success",
            message: "Terapia eliminada correctamente",
            therapy: therapy
        });
    }
    return respuesta;

}

const updateTherapy = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;
    var therapy;

    therapy = await Therapy.findOne({ $and: [{ _id: { $not: { $eq: id } } }, { name: parameters.name }] });

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
    getTherapy,
    searchTherapy
}