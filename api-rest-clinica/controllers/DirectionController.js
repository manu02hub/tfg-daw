const Direction = require("../models/Direction");
const bycrypt = require("bcrypt");

const createDirection = async (req, res) => {

    var direction;
    let respuesta;
    let parameters = req.body;

    direction = new Direction(parameters);
    await direction.save();

    respuesta = res.status(200).json({
        state: "success",
        direction: direction
    });

    return respuesta;

}

const getDirection = async (req, res) => {

    let id = req.params.id;

    const directionGet = await Direction.findById(id);

    return res.status(200).json({
        state: "success",
        direction: directionGet,
    });
}


const deleteDirection = async (req, res) => {

    let id = req.params.id;

    await Direction.findByIdAndDelete(id);

    return res.status(200).json({
        state: "success",
        message: "Direccióm eliminada correctamente"
    });

}


const updateDirection = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;
    let respuesta;
    var direction;

    direction = await Direction.findByIdAndUpdate(id, parameters, { new: true });

    respuesta = res.status(200).json({
        state: "success",
        message: "Contactos editados correctamente",
        direction: direction
    });

    return respuesta;

}

module.exports = {
   createDirection,
   getDirection,
   updateDirection,
   deleteDirection
}