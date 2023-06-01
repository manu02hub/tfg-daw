const Activity = require("../models/Activity");
const CryptoJS = require("crypto-js");

const createActivity = async (req, res) => {

    var activity;
    let respuesta;
    let parametros = req.body;

    activity = new Activity(parametros);
    await activity.save();

    respuesta = res.status(200).json({
        state: "success",
        activity: activity
    });

    return respuesta;

}

const getActivity = async (req, res) => {
    let id = req.params.id;

    const activities = await Activity.find({ id_clinic: id }).sort({ date: 'desc' }).limit(30).exec();

    return res.status(200).json({
        state: "success",
        activities
    });
}


module.exports = {
    createActivity,
    getActivity,
}