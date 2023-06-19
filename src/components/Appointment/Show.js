/* Show.js */

import React from "react";

export default function Show({ student, interviewer, id, onEdit, onDelete }) {
  const handleEdit = () => {
    onEdit({ student, interviewer, id });
  };
  console.log("Interviewer:", interviewer);

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{interviewer && interviewer.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={handleEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={handleDelete}
          />
        </section>
      </section>
    </main>
  );
}


