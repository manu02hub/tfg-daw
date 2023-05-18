const DayBlocked = require("../models/DayBlocked");

const createBlocked = async (req, res) => {

    let dayBlocked;
    let respuesta;
    let parametros = req.body;

    dayBlocked = new DayBlocked(parametros);
    await dayBlocked.save();

    respuesta = res.status(200).json({
        state: "success",
        dayBlocked: dayBlocked
    });

    return respuesta;
}

const getDaysBlockedClinic = async (req, res) => {

    let id = req.params.id;

    const daysBlocked = await DayBlocked.find({ id_clinic: id }).exec();

    return res.status(200).json({
        state: "success",
        daysBlocked
    });
}

const getDayBlocked = async (req, res) => {

    let id = req.params.id;

    const dayBlocked = await DayBlocked.findById(id);

    return res.status(200).json({
        state: "success",
        dayBlocked: dayBlocked,
    });
}

const deleteDayBlocked = async (req, res) => {

    let id = req.params.id;

    await DayBlocked.findByIdAndDelete(id);

    return res.status(200).json({
        state: "success",
        message: "Día eliminado correctamente"
    });

}

module.exports = {
    createBlocked,
    getDaysBlockedClinic,
    getDayBlocked,
    deleteDayBlocked,
}