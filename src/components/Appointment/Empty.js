/* Empty.js */

import React from "react";

export default function Empty({ onAdd }) {
  const handleAddClick = () => {
    onAdd();
  };

  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={handleAddClick}
      />
    </main>
  );
}
