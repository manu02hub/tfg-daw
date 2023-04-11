import React from "react";
import { Outlet } from "react-router-dom";

function PrivateLayout() {
  return (
    <div className="contenedorPrivate">
      <aside className="aside"></aside>
      <div className="privateRight">
        <header className="header"></header>
      </div>
    </div>
  );
}

export default PrivateLayout;
