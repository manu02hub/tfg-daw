const Tutor = require("../models/Tutor");
const Direction = require("../models/Direction");

const createTutor = async (req, res) => {

    var tutor;
    let respuesta;
    let parameters = req.body;

    tutor = new Tutor(parameters);
    await tutor.save();

    respuesta = res.status(200).json({
        state: "success",
        tutor: tutor
    });
    // }

    return respuesta;

}

const getTutor = async (req, res) => {

    let id = req.params.id;

    const tutorGet = await Tutor.findById(id).populate('id_direction');

    return res.status(200).json({
        state: "success",
        tutor: tutorGet,
    });
}


const deleteTutor = async (req, res) => {

    let id = req.params.id;

    await Tutor.findByIdAndDelete(id);

    return res.status(200).json({
        state: "success",
        message: "Tutor eliminados correctamente"
    });

}


const updateTutor = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;
    let respuesta;
    var tutor;

    tutor = await Tutor.findByIdAndUpdate(id, parameters, { new: true });

    respuesta = res.status(200).json({
        state: "success",
        message: "Tutor editado correctamente",
        tutor: tutor
    });
    // }

    return respuesta;

}

const getTutorContact = async (req, res) => {

    let id = req.params.id;
    let respuesta;

    const tutorGet = await Tutor.findOne({ id_contact: id }).populate('id_direction');

    if (tutorGet) {
        respuesta = res.status(200).json({
            state: "success",
            tutor: tutorGet,
        });
    } else {
        return res.status(200).json({
            state: "error",
            message: "No se ha encontrado ningún Tutor con esos datos",
        });
    }

    return respuesta;
}

module.exports = {
    createTutor,
    getTutor,
    updateTutor,
    deleteTutor,
    getTutorContact
}