const Other = require("../models/Other");
const CryptoJS = require("crypto-js");

const createOther = async (req, res) => {

    var other;
    let respuesta;
    let parameters = req.body;

    parameters.diseases = CryptoJS.AES.encrypt(parameters.diseases, 'ToothSensation2023').toString();
    parameters.allergies = CryptoJS.AES.encrypt(parameters.allergies, 'ToothSensation2023').toString();

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
    var bytes;

    const otherGet = await Other.findById(id);

    if(otherGet._id){
        bytes = CryptoJS.AES.decrypt(otherGet.diseases, 'ToothSensation2023');
        otherGet.diseases = bytes.toString(CryptoJS.enc.Utf8);
    
        bytes = CryptoJS.AES.decrypt(otherGet.allergies, 'ToothSensation2023');
        otherGet.allergies = bytes.toString(CryptoJS.enc.Utf8);
    }

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

    
    parameters.diseases = CryptoJS.AES.encrypt(parameters.diseases, 'ToothSensation2023').toString();
    parameters.allergies = CryptoJS.AES.encrypt(parameters.allergies, 'ToothSensation2023').toString();

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