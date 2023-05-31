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

const getAppointmentsPatient = async (req, res) => {
    let id = req.params.id;

    const appointments = await Appointment.find({ id_patient: id }).exec();

    return res.status(200).json({
        state: "success",
        appointments
    });
}



const getAppointment = async (req, res) => {

    let id = req.params.id;

    const appointmentGet = await Appointment.findById(id);

    return res.status(200).json({
        state: "success",
        appointment: appointmentGet,
    });
}

const deleteAppointment = async (req, res) => {

    let id = req.params.id;

    await Appointment.findByIdAndDelete(id);

    return res.status(200).json({
        state: "success",
        message: "Appointment eliminado correctamente"
    });

}

const updateAppointment = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;
    var appointment;

    if (id) {

        appointment = await Appointment.findOne({ _id: id });

        if (appointment) {

            appointment = await Appointment.findByIdAndUpdate(id, parameters, { new: true });

            respuesta = res.status(200).json({
                state: "success",
                message: "Cita editada correctamente",
                appointment: appointment
            });

        } else {
            respuesta = res.status(200).json({
                state: "success",
                message: "No se ha encontrado la cita",
            });
        }

    } else {
        respuesta = res.status(400).json({
            state: "error",
            message: "Algo ha ido mal",

        });
    }

    return respuesta;

}

module.exports = {
    createAppointment,
    getAppointmentsCabinet,
    deleteAppointment,
    getAppointment,
    getAppointmentsPatient,
    updateAppointment,
}