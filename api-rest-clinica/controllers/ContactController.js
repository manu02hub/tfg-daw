const Contact = require("../models/Contact");

const createContact = async (req, res) => {

    var contact;
    let respuesta;
    let parameters = req.body;

    contact = new Contact(parameters);
    await contact.save();

    respuesta = res.status(200).json({
        state: "success",
        contact: contact
    });
    // }

    return respuesta;

}

const getContact = async (req, res) => {

    let id = req.params.id;

    const contactGet = await Contact.findById(id);

    return res.status(200).json({
        state: "success",
        contact: contactGet,
    });
}


const deleteContact = async (req, res) => {

    let id = req.params.id;

    await Contact.findByIdAndDelete(id);

    return res.status(200).json({
        state: "success",
        message: "Contactos eliminados correctamente"
    });

}


const updateContact = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;
    let respuesta;
    var contact;

    // cabinet = await Cabinet.findOne({ $and: [{ _id: { $not: { $eq: id } } }, { reference: parameters.reference }] });

    // if (cabinet) {
    //     respuesta = res.status(200).json({
    //         state: "error",
    //         message: "Ya existe un gabinete con ese nombre",
    //     });
    // } else {

    contact = await Contact.findByIdAndUpdate(id, parameters, { new: true });

    respuesta = res.status(200).json({
        state: "success",
        message: "Contactos editados correctamente",
        contact: contact
    });
    // }

    return respuesta;

}


const searchContact = async (req, res) => {

    let contact;
    let respuesta;
    let id = req.params.id;

    if (id) {
        // contact = await Contact.findOne({ $or: [{ email: id }, { mobile_phone: id }] });
        contact = await Contact.findOne({ $or: [{ nif: id }, { mobile_phone: id }] });

        if (contact) {

            respuesta = res.status(200).json({
                state: "success",
                message: "Encontrado",
                contact: contact
            });

        } else {
            respuesta = res.status(200).json({
                state: "error",
                message: "No existe el contacto",
            });
        }

    } else {
        respuesta = res.status(200).json({
            state: "error",
            message: "El campo no puede estar vacio",
        });
    }

    return respuesta;


}

module.exports = {
    createContact,
    getContact,
    updateContact,
    deleteContact,
    searchContact
}