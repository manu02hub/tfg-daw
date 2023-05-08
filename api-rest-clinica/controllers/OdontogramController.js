const Odontogram = require("../models/Odontogram");

const createOdontogram = async (req, res) => {

    var odontogram;
    let respuesta;
    let parametros = req.body;

    odontogram = await Odontogram.findOne({ name: parametros.name });

    if (odontogram) {

        respuesta = res.status(200).json({
            state: "error",
            message: "Ya hay un odontograma con ese nombre"
        });
    } else {

        odontogram = new Odontogram(parametros);
        await odontogram.save();

        respuesta = res.status(200).json({
            state: "success",
            odontogram: odontogram
        });
    }

    return respuesta;

}

const getAllOdontograms = async (req, res) => {

    const odontograms = await Odontogram.find({}).exec();

    return res.status(200).json({
        state: "success",
        odontograms
    });
}


const getOdontogram = async (req, res) => {

    let id = req.params.id;

    const odontogramGet = await Odontogram.findById(id);

    return res.status(200).json({
        state: "success",
        odontogram: odontogramGet,
    });
}


module.exports = {
    createOdontogram,
    getAllOdontograms,
    getOdontogram
}