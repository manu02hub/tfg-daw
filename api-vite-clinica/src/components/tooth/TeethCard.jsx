import React from "react";

function TeethCard({imagen, onClick}) {
  return <img src={imagen} className="imgPiece" onClick={onClick}/>;
}

export default TeethCard;
