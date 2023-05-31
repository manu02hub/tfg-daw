const express = require('express');
const cors = require('cors');
const userRoutes = require("../routes/user");
const clinicRoutes = require("../routes/clinic");
const rolRoutes = require("../routes/rol");
const therapyRoutes = require("../routes/therapy");
const cabinetRoutes = require("../routes/cabinet");
const patientRoutes = require("../routes/patient");
const odontogramRoutes = require("../routes/odontogram");
const toothRoutes = require("../routes/tooth");
const therapy_has_patientRoutes = require("../routes/therapy_has_patient");
const appointmentRoutes = require("../routes/appointment");
const dayBlockedRoutes = require("../routes/dayBlocked");
const directionRoutes = require("../routes/direction");
const contactRoutes = require("../routes/contact");
const otherRoutes = require("../routes/other");
const tutorRoutes = require("../routes/tutor");
const billreferenceRoutes = require("../routes/billreference");
const billRoutes = require("../routes/bill");
const activityRoutes = require("../routes/activity");

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
    app.use('/api/odontogram', odontogramRoutes);
    app.use('/api/tooth', toothRoutes);
    app.use('/api/therapy_has_patient', therapy_has_patientRoutes);
    app.use('/api/appointment', appointmentRoutes);
    app.use('/api/dayBlocked', dayBlockedRoutes);
    app.use('/api/direction', directionRoutes);
    app.use('/api/contact', contactRoutes);
    app.use('/api/other', otherRoutes);
    app.use('/api/tutor', tutorRoutes);
    app.use('/api/billreference', billreferenceRoutes);
    app.use('/api/bill', billRoutes);
    app.use('/api/activity', activityRoutes);


    //Poner servidor a escuchar peticiones http
    app.listen(puerto, () => {
        console.log("Servidor de node corriendo perfectamente");
    })
}

module.exports = {
    lanzarServidor
}
