const Direction = require("../models/Direction");
const CryptoJS  = require("crypto-js");

const createDirection = async (req, res) => {

    var direction;
    let respuesta;
    let parameters = req.body;

    parameters.street = CryptoJS.AES.encrypt(JSON.stringify(parameters.street), 'ToothSensation2023').toString();
    parameters.number = CryptoJS.AES.encrypt(JSON.stringify(parameters.number), 'ToothSensation2023').toString();
    parameters.flat = CryptoJS.AES.encrypt(JSON.stringify(parameters.flat), 'ToothSensation2023').toString();
    parameters.z_code = CryptoJS.AES.encrypt(JSON.stringify(parameters.z_code), 'ToothSensation2023').toString();
    parameters.city = CryptoJS.AES.encrypt(JSON.stringify(parameters.city), 'ToothSensation2023').toString();
    parameters.province = CryptoJS.AES.encrypt(JSON.stringify(parameters.province), 'ToothSensation2023').toString();

    direction = new Direction(parameters);
    await direction.save();

    respuesta = res.status(200).json({
        state: "success",
        direction: direction
    });

    return respuesta;

}

const getDirection = async (req, res) => {

    var bytes;
    let id = req.params.id;

    const directionGet = await Direction.findById(id);

    if(directionGet._id){
        bytes = CryptoJS.AES.decrypt(directionGet.street, 'ToothSensation2023');
        directionGet.street = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
        bytes = CryptoJS.AES.decrypt(directionGet.number, 'ToothSensation2023');
        directionGet.number = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
        bytes = CryptoJS.AES.decrypt(directionGet.flat, 'ToothSensation2023');
        directionGet.flat = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
        bytes = CryptoJS.AES.decrypt(directionGet.z_code, 'ToothSensation2023');
        directionGet.z_code = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
        bytes = CryptoJS.AES.decrypt(directionGet.city, 'ToothSensation2023');
        directionGet.city = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
        bytes = CryptoJS.AES.decrypt(directionGet.province, 'ToothSensation2023');
        directionGet.province = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

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

    parameters.street = CryptoJS.AES.encrypt(JSON.stringify(parameters.street), 'ToothSensation2023').toString();
    parameters.number = CryptoJS.AES.encrypt(JSON.stringify(parameters.number), 'ToothSensation2023').toString();
    parameters.flat = CryptoJS.AES.encrypt(JSON.stringify(parameters.flat), 'ToothSensation2023').toString();
    parameters.z_code = CryptoJS.AES.encrypt(JSON.stringify(parameters.z_code), 'ToothSensation2023').toString();
    parameters.city = CryptoJS.AES.encrypt(JSON.stringify(parameters.city), 'ToothSensation2023').toString();
    parameters.province = CryptoJS.AES.encrypt(JSON.stringify(parameters.province), 'ToothSensation2023').toString();


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