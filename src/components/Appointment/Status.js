/* Status.js */
import React from "react";

export default function Status({ mode }) {
  const statusText = mode === "SAVING" ? "Saving" : "Deleting";

  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{statusText}</h1>
    </main>
  );
}
