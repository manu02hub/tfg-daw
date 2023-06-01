const Tutor = require("../models/Tutor");
const Direction = require("../models/Direction");
const CryptoJS  = require("crypto-js");

const createTutor = async (req, res) => {

    var tutor;
    let respuesta;
    let parameters = req.body;

    parameters.name = CryptoJS.AES.encrypt(JSON.stringify(parameters.name), 'ToothSensation2023').toString();
    parameters.surnames = CryptoJS.AES.encrypt(JSON.stringify(parameters.surnames), 'ToothSensation2023').toString();

    tutor = new Tutor(parameters);
    console.log(tutor);
    await tutor.save();

    respuesta = res.status(200).json({
        state: "success",
        tutor: tutor
    });
    // }

    return respuesta;

}

const getTutor = async (req, res) => {

    var bytes;
    let id = req.params.id;

    const tutorGet = await Tutor.findById(id).populate('id_direction');

    if(tutorGet._id){
        bytes = CryptoJS.AES.decrypt(tutorGet.name, 'ToothSensation2023');
        tutorGet.name = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
        bytes = CryptoJS.AES.decrypt(tutorGet.surnames, 'ToothSensation2023');
        tutorGet.surnames = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(tutorGet.id_direction.street, 'ToothSensation2023');
        tutorGet.id_direction.street = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(tutorGet.id_direction.number, 'ToothSensation2023');
        tutorGet.id_direction.number = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(tutorGet.id_direction.flat, 'ToothSensation2023');
        tutorGet.id_direction.flat = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(tutorGet.id_direction.z_code, 'ToothSensation2023');
        tutorGet.id_direction.z_code = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(tutorGet.id_direction.city, 'ToothSensation2023');
        tutorGet.id_direction.city = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(tutorGet.id_direction.province, 'ToothSensation2023');
        tutorGet.id_direction.province = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

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

    parameters.name = CryptoJS.AES.encrypt(JSON.stringify(parameters.name), 'ToothSensation2023').toString();
    parameters.surnames = CryptoJS.AES.encrypt(JSON.stringify(parameters.surnames), 'ToothSensation2023').toString();


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

        bytes = CryptoJS.AES.decrypt(tutorGet.name, 'ToothSensation2023');
        tutorGet.name = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
        bytes = CryptoJS.AES.decrypt(tutorGet.surnames, 'ToothSensation2023');
        tutorGet.surnames = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(tutorGet.id_direction.street, 'ToothSensation2023');
        tutorGet.id_direction.street = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(tutorGet.id_direction.number, 'ToothSensation2023');
        tutorGet.id_direction.number = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(tutorGet.id_direction.flat, 'ToothSensation2023');
        tutorGet.id_direction.flat = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(tutorGet.id_direction.z_code, 'ToothSensation2023');
        tutorGet.id_direction.z_code = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(tutorGet.id_direction.city, 'ToothSensation2023');
        tutorGet.id_direction.city = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        bytes = CryptoJS.AES.decrypt(tutorGet.id_direction.province, 'ToothSensation2023');
        tutorGet.id_direction.province = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        respuesta = res.status(200).json({
            state: "success",
            tutor: tutorGet,
        });
    } else {
        return res.status(200).json({
            state: "error",
            message: "No se ha encontrado ningún tutor con esos datos",
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