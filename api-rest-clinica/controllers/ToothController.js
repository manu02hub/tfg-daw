const Tooth = require("../models/Tooth");

const createTooth = async (req, res) => {

    var tooth;
    let respuesta;
    let parametros = req.body;

    tooth = await Tooth.findOne({ $and: [{ number: parametros.number }, { letter: parametros.letter }] });

    if (tooth) {

        respuesta = res.status(200).json({
            state: "error",
            message: "Ya hay un diente con ese nombre"
        });
    } else {

        tooth = new Tooth(parametros);
        await tooth.save();

        respuesta = res.status(200).json({
            state: "success",
            tooth: tooth
        });
    }

    return respuesta;

}

const getTheet = async (req, res) => {

    let id = req.params.id;

    const teeth = await Tooth.find({ _id: id }).exec();

    return res.status(200).json({
        state: "success",
        teeth
    });
}


const getTheetOdontogram = async (req, res) => {

    let id = req.params.id;

    const teeth = await Tooth.find({ id_odontogram: id });

    return res.status(200).json({
        state: "success",
        teeth: teeth,
    });
}


module.exports = {
    createTooth,
    getTheetOdontogram,
    getTheet,
}