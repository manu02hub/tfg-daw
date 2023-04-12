const Permission = require("../models/Permission");

const getPermission = (id)=>{
    try {
        Permission.getPermissionDB(id);
    } catch (error) {
        
    }
}


module.exports = {
    getPermission
}