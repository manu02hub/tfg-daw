const jwt = require("jwt-simple");
const moment = require("moment");

//Clave secreta
const secret = "130423M4NU3L";

//Función para genrar tokens
const createToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        id_rol: user.id_rol,
        id_clinic: user.id_clinic,
        date: user.date,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    }

    //Devolver token codificado
    return jwt.encode(payload, secret);
}

module.exports = {
    secret,
    createToken
}



