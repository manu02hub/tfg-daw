const Bill = require("../models/Bill");

const createBill = async (req, res) => {

    var bill;
    let respuesta;
    let parametros = req.body;

    bill = new Bill(parametros);
    await bill.save();

    respuesta = res.status(200).json({
        state: "success",
        bill: bill
    });

    return respuesta;

}

const getBills = async (req, res) => {

    let id = req.params.id;

    const bills = await Bill.find({ number_bill: id }).exec();

    return res.status(200).json({
        state: "success",
        bills
    });
}

const getBill = async (req, res) => {

    let id = req.params.id;

    const bill = await Bill.findById(id);

    return res.status(200).json({
        state: "success",
        bill: bill,
    });
}


const deleteBill = async (req, res) => {

    let respuesta;
    let billreference;
    let id = req.params.id;

    const bill = await Bill.findByIdAndDelete(id);

    return res.status(200).json({
        state: "success",
        message: "Factura eliminada correctamente",
        bill: bill
    });

}


const updateBill = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;
    let respuesta;
    var bill;

    bill = await Bill.findByIdAndUpdate(id, parameters, { new: true });

    respuesta = res.status(200).json({
        state: "success",
        message: "Factura editada correctamente",
        bill: bill
    });

    return respuesta;

}

module.exports = {
    createBill,
    getBill,
    getBills,
    updateBill,
    deleteBill,
}