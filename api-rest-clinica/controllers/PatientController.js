const Patient = require("../models/Patient");
const bycrypt = require("bcrypt");


// const getUser = async (req, res) => {
//     const id = req.params.id;

//     const user = await User.findOne({ _id: id });
//     const permissionsUser = await Rol.findOne({ _id: user.id_rol }).populate('id_permissions');

//     return res.status(200).json({
//         state: "success",
//         user: {
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             id_clinic: user.id_clinic,
//             id_rol: user.id_rol,
//             name_rol: permissionsUser.name,
//             permissions: permissionsUser.id_permissions,
//         },
//     });
// }

const createPatient = async (req, res) => {
    let parameters = req.body;
    let respuesta;

    //Validar?

    // let patientCrypt = await bycrypt.hash(parameters, 10);
   

    const patientCreate = new Patient(parameters);

    const patientFind = await Patient.find({ mobile_phone: patientCreate.mobile_phone }).exec();

    if (patientFind.length < 1) {
        await patientCreate.save();
        respuesta = res.status(200).json({
            state: "success",
            patient: patientCreate
        });

    } else {
        respuesta = res.status(200).json({
            state: "error",
            message: "El paciente ya existe"
        });
    }

    return respuesta;

}

// const getAllUsers = async (req, res) => {

//     const id = req.params.id;

//     const allUsers = await User.find({ _id: { $not: { $eq: id } } }).sort({ date: -1 }).populate('id_rol').exec();

//     return res.status(200).json({
//         state: "success",
//         allUsers,
//     });
// }

// const getUsersClinic = async (req, res) => {

//     const id_clinic = req.params.clinic;
//     const id = req.params.id;

//     const allUsers = await User.find({ $and: [{ _id: { $not: { $eq: id } } }, { id_clinic: id_clinic }] }).populate('id_rol').exec();

//     return res.status(200).json({
//         state: "success",
//         allUsers,
//     });

// }

// const editUser = async (req, res) => {

//     const id = req.params.id;

//     const user = await User.findOne({ _id: id });

//     return res.status(200).json({
//         state: "success",
//         user,
//     });

// }

// const updateUser = async (req, res) => {
//     let id = req.params.id;
//     let parameters = req.body;
//     let user = req.user;
//     let pass;
//     let respuesta;
//     let equal;

//     delete user.iat;
//     delete user.exp;
//     delete user.date;

//     if (parameters.email) {
//         var userFind = await User.findOne({ $and: [{ _id: { $not: { $eq: id } } }, { email: parameters.email }] });


//         if (userFind) {

//             respuesta = res.status(200).json({
//                 state: "error",
//                 message: "El usuario ya existe"
//             });

//         } else {

//             const userUpdate = await User.findByIdAndUpdate(id, parameters, { new: true });

//             respuesta = res.status(200).json({
//                 state: "success",
//                 message: "Usuario editado correctamente",
//                 user: userUpdate
//             });
//         }
//     }


//     if (parameters.current) {
//         var userPass = await User.findOne({ _id: id });
//         equal = bycrypt.compareSync(parameters.current, userPass.password);


//         if (!equal) {
//             respuesta = res.status(200).json({
//                 state: "error",
//                 message: "La contraseña no es correcta",
//             });
//         } else {

//             if (parameters.password) {
//                 pass = await bycrypt.hash(parameters.password, 10);
//                 parameters.password = pass;

//                 const userUpdate = await User.findByIdAndUpdate(id, parameters, { new: true });

//                 respuesta = res.status(200).json({
//                     state: "success",
//                     message: "Usuario editado correctamente",
//                     user: userUpdate
//                 });
//             }
//         }
//     }

//     if (!parameters.email && !parameters.current) {

//         pass = await bycrypt.hash(parameters.password, 10);
//         parameters.password = pass;

//         const userUpdate = await User.findByIdAndUpdate(id, parameters, { new: true });

//         respuesta = res.status(200).json({
//             state: "success",
//             message: "Usuario editado correctamente",
//             user: userUpdate
//         });
//     }

//     return respuesta;
// }

// const deleteUser = async (req, res) => {
//     let id = req.params.id;
//     let parameters = req.body;
//     let equal;
//     let respuesta;

//     const user = await User.findOne({ _id: parameters.id });

//     if (user) {
//         equal = bycrypt.compareSync(parameters.password, user.password);

//         if (equal) {
//             await User.findByIdAndDelete(id);

//             respuesta = res.status(200).json({
//                 state: "success",
//                 message: "Usuario eliminado correctamente",
//             });
//         }else{
//             respuesta = res.status(200).json({
//                 state: "error",
//                 message: "La contraseña no es correcta",
//             });
//         }
//     } else {

//         respuesta = res.status(200).json({
//             state: "error",
//             message: "No se encuentra al usuario",
//         });
//     }

//     return respuesta;
// }

module.exports = {
    // getUser,
    createPatient,
    // login,
    // getAllUsers,
    // getUsersClinic,
    // editUser,
    // updateUser,
    // deleteUser
}