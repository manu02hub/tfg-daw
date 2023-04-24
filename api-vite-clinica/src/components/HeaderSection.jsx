import React from "react";

function HeaderSection({ children, title }) {
  return (
    <div className="headerSection">
      <div className="headerName">
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default HeaderSection;
