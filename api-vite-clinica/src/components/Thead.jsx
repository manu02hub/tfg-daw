import React from "react";

function Thead({ menu }) {
  return (
    <thead>
      <tr>
        {menu.map((title) => {
          return (
            <th key={title}>
              <div className="theadTitles">{title}</div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default Thead;
