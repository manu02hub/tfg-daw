const express = require('express');
const cors = require('cors');

const lanzarServidor = () => {
    //Crear servidor node
    const app = express();
    const puerto = 3900;

    //Configurar cors
    app.use(cors());

    //Convertir los datos del body a objetos js
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Cargar rutas

    //Ruta de prueba

    app.get('/ruta-prueba', (req, res) => {
        return res.status(200).json({
            mesaage: "Funciona correctamente"
        })
    });

    //Poner servidor a escuchar peticiones http
    app.listen(puerto, () => {
        console.log("Servidor de node corriendo perfectamente");
    })
}

module.exports = {
    lanzarServidor
}
