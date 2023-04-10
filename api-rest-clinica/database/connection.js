const  mongoose  = require("mongoose");

const conexion = async() =>{
    try {

        await mongoose.connect("mongodb://localhost:27017/tfg_clinica",{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            family: 4
        });
        console.log("conectado");
        
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos")
    }
}

module.exports = {
    conexion
}