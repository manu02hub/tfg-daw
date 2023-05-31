const BillReference = require("../models/BillReference");

const createBillReference = async (req, res) => {

    var billreference;
    let respuesta;
    let increment;
    let parametros = req.body;

    billreference = await BillReference.find({}).sort({ reference: 'desc' }).limit(1).exec();

    if (billreference.length >= 1) {

        increment = Number.parseInt(billreference[0].reference) + 1;
        parametros.reference = increment;

    }

    billreference = new BillReference(parametros);
    await billreference.save();

    respuesta = res.status(200).json({
        state: "success",
        billreference: billreference
    });

    return respuesta;

}

const getBillReferences = async (req, res) => {

    let id = req.params.id;

    const billreferences = await BillReference.find({ $and: [{ id_clinic: id }, { active: true }] }).exec();

    return res.status(200).json({
        state: "success",
        billreferences
    });
}

const getBillReference = async (req, res) => {

    let id = req.params.id;

    const billreference = await BillReference.findById(id);

    return res.status(200).json({
        state: "success",
        billreference: billreference,
    });
}


const deleteBillReference = async (req, res) => {

    let id = req.params.id;

    const billreference = await BillReference.findByIdAndUpdate(id, { active: false });

    return res.status(200).json({
        state: "success",
        message: "Factura eliminada correctamente",
        billreference: billreference,
    });

}


const updateBillReference = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;
    let respuesta;
    var billreference;

    billreference = await BillReference.updateOne({ reference: id }, parameters, { new: true });

    respuesta = res.status(200).json({
        state: "success",
        message: "Factura editada correctamente",
        billreference: billreference
    });

    return respuesta;

}

module.exports = {
    createBillReference,
    getBillReferences,
    getBillReference,
    updateBillReference,
    deleteBillReference,
}