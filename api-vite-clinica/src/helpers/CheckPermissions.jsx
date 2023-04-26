export const checkPermission = (obj, nombre) => {

  let permission = obj.find((per) => per.name == nombre);

  return permission;
};
