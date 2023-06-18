/* Error.js */

import React from "react";
import Button from "components/Button";

export default function Error(props) {
  return (
    <main className="appointment__card appointment__card--error">
      <h1 className="text--semi-bold">{props.message}</h1>
      <Button danger onClick={props.onClose}>
        Close
      </Button>
    </main>
  );
}
