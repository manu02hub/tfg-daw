export const menorMayor = (obj, letra , rango1, rango2) => {

    let aux;

    aux = obj.filter((t) => t.letter === letra && t.number >= rango1 && t.number <= rango2);
  
    return aux;
  };
  