const express = require('express');
const cors = require('cors');
const userRoutes = require("../routes/user");
const clinicRoutes = require("../routes/clinic");
const rolRoutes = require("../routes/rol");
const therapyRoutes = require("../routes/therapy");
const cabinetRoutes = require("../routes/cabinet");
const patientRoutes = require("../routes/patient");

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
    app.use("/api/rol", rolRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/clinic", clinicRoutes);
    app.use("/api/therapy", therapyRoutes);
    app.use("/api/cabinet", cabinetRoutes);
    app.use("/api/patient", patientRoutes);

    //Poner servidor a escuchar peticiones http
    app.listen(puerto, () => {
        console.log("Servidor de node corriendo perfectamente");
    })
}

module.exports = {
    lanzarServidor
}
