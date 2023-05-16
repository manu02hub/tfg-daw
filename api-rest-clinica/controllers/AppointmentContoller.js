const Appointment = require("../models/Appointment");

const createAppointment = async (req, res) => {

    let parametros = req.body;
    let respuesta;
    var appointment;


    // appointment = await Appointment.findOne({ name: parametros.name });

    // if (appointment) {
    //     respuesta = res.status(200).json({
    //         state: "error",
    //         message: "Ya existe el tratamiento"
    //     });
    // } else {

    appointment = new Appointment(parametros);
    await appointment.save();

    respuesta = res.status(200).json({
        state: "success",
        appointment: appointment
    });
    // }


    return respuesta;

}

const getAppointmentsCabinet = async (req, res) => {
    let id = req.params.id;

    const appointments = await Appointment.find({ id_cabinet: id }).exec();

    return res.status(200).json({
        state: "success",
        appointments
    });
}

// const getTherapy = async (req, res) => {

//     let id = req.params.id;

//     const therapyGet = await Therapy.findById(id);

//     return res.status(200).json({
//         state: "success",
//         therapy: therapyGet,
//     });
// }

const deleteAppointment = async (req, res) => {

    let id = req.params.id;

    await Appointment.findByIdAndDelete(id);

    return res.status(200).json({
        state: "success",
        message: "Appointment eliminado correctamente"
    });

}

// const updateAppointment = async (req, res) => {
//     let id = req.params.id;
//     let parameters = req.body;
//     var therapy;

//     therapy = await Therapy.findOne({ $and: [{ _id: { $not: { $eq: id } } }, { name: parameters.name }] });

//     if (therapy) {
//         respuesta = res.status(200).json({
//             state: "error",
//             message: "Ya existe el tratamiento"
//         });

//     } else {

//         therapy = await Therapy.findByIdAndUpdate(id, parameters, { new: true });

//         respuesta = res.status(200).json({
//             state: "success",
//             message: "Terapia editada correctamente",
//             therapy: therapy

//         });
//     }

//     return respuesta;

// }

module.exports = {
    createAppointment,
    getAppointmentsCabinet,
    deleteAppointment,
    // updateTherapy,
    // getTherapy
}