const Other = require("../models/Other");
const bycrypt = require("bcrypt");

const createOther = async (req, res) => {

    var other;
    let respuesta;
    let parameters = req.body;

    other = new Other(parameters);
    await other.save();

    respuesta = res.status(200).json({
        state: "success",
        other: other
    });

    return respuesta;

}

const getOther = async (req, res) => {

    let id = req.params.id;

    const otherGet = await Other.findById(id);

    return res.status(200).json({
        state: "success",
        other: otherGet,
    });
}


const deleteOther = async (req, res) => {

    let id = req.params.id;

    await Other.findByIdAndDelete(id);

    return res.status(200).json({
        state: "success",
        message: "Other eliminado correctamente"
    });

}


const updatOther = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;
    let respuesta;
    var other;

    other = await Other.findByIdAndUpdate(id, parameters, { new: true });

    respuesta = res.status(200).json({
        state: "success",
        message: "Other editado correctamente",
        other: other
    });

    return respuesta;

}

module.exports = {
   createOther,
   getOther,
   updatOther,
   deleteOther
}