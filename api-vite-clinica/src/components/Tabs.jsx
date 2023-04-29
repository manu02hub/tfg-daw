import React from "react";

function Tabs({ children }) {
  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="nav-tab shadow">
          <div className="tabs">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
