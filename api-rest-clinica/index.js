const { conexion } = require('./database/connection');
const {lanzarServidor} = require('./server/server');

console.log("App de node arrancada");

//Conexion a la base de datos
conexion();

//Lanzar server
lanzarServidor();