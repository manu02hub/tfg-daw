import React from "react";

function TeethCard({imagen, select, onClick}) {
  return <img src={imagen} className={select ? "imgPiece shadowImg" : "imgPiece" } onClick={onClick}/>;
}

export default TeethCard;
