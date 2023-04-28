export const PeticionAJAX = async (url, metodo, datosGuardar="") => {
  let cargando = true;

  let opciones = {
    method: "GET",
  };

  if (metodo == "GET" || metodo == "DELETE") {
    opciones = {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
  }
  if (metodo == "POST" || metodo == "PUT") {
    opciones = {
      method: metodo,
      body: JSON.stringify(datosGuardar),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
  }

  const peticion = await fetch(url, opciones);
  const datos = await peticion.json();

  cargando = false;

  return {
    datos,
    cargando,
  };
};

