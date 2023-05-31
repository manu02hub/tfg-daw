const Cabinet = require("../models/Cabinet");

const createCabinet = async (req, res) => {

    var cabinet;
    let respuesta;
    let parametros = req.body;

    cabinet = await Cabinet.findOne({ reference: parametros.reference });

    if (cabinet) {

        respuesta = res.status(200).json({
            state: "error",
            message: "Ya hay un gabinete con ese nombre"
        });
    } else {

        cabinet = new Cabinet(parametros);
        await cabinet.save();

        respuesta = res.status(200).json({
            state: "success",
            cabinet: cabinet
        });
    }

    return respuesta;

}

const getAllCabinets = async (req, res) => {

    const cabinets = await Cabinet.find({}).exec();

    return res.status(200).json({
        state: "success",
        cabinets
    });
}

const getAllGabinetClinic = async (req, res) => {
    let id = req.params.id;

    const cabinets = await Cabinet.find({id_clinic: id}).exec();

    return res.status(200).json({
        state: "success",
        cabinets
    });
}

const getCabinet = async (req, res) => {

    let id = req.params.id;

    const cabinetGet = await Cabinet.findById(id);

    return res.status(200).json({
        state: "success",
        cabinet: cabinetGet,
    });
}


const deleteCabinet = async (req, res) => {

    let id = req.params.id;

    const cabinet = await Cabinet.findByIdAndDelete(id);

    return res.status(200).json({
        state: "success",
        message: "Gabinete eliminado correctamente",
        cabinet:cabinet
    });

}


const updateCabinet = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;
    let respuesta;
    var cabinet;

    cabinet = await Cabinet.findOne({ $and: [{ _id: { $not: { $eq: id } } }, { reference: parameters.reference }] });

    if (cabinet) {
        respuesta = res.status(200).json({
            state: "error",
            message: "Ya existe un gabinete con ese nombre",
        });
    } else {

        cabinet = await Cabinet.findByIdAndUpdate(id, parameters, { new: true });

        respuesta = res.status(200).json({
            state: "success",
            message: "Clinica editada correctamente",
            cabinet: cabinet
        });
    }

    return respuesta;

}

module.exports = {
    createCabinet,
    getAllGabinetClinic,
    getAllCabinets,
    deleteCabinet,
    updateCabinet,
    getCabinet
}