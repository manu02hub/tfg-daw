//modulos
const jwt = require("jwt-simple");
const moment = require("moment");

//Importar clave secreta
const jwtService = require("../services/jwt");
const secretJWT = jwtService.secret;

exports.auth = (req, res, next) => {
    let respuesta;
    let token;
    let payload;

    if (!req.headers.authorization) {
        respuesta = res.status(403).json({
            status: "error",
            message: "La peticion no tiene cabecera de autentication"
        });

    } else {

        try {

            //Limpiamos token de comillas
            token = req.headers.authorization.replace(/['"]+/g, '');

            //Descodificamos token
            payload = jwt.decode(token, secretJWT);

            //Miramos si token a expirado o no
            if (payload.exp <= moment().unix) {
                respuesta = res.status(401).json({
                    status: "error",
                    message: "Token expirado"
                });

                //Damos los datos al usuario y pasamos a ejecutar la accion del controlador
            } else {
                req.user = payload;
                next();
            }

        } catch (error) {

        }


    }

    return respuesta;
}

//Fución autenticacion

//Descodificar token

//Agrgar datos de user a request

//Pasar a ejecucion