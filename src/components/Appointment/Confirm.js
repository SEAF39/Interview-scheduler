/* Confirm.js */

import React from "react";
import classnames from "classnames";
import Button from "components/Button";

export default function Confirm(props) {
  const { message, onConfirm, onCancel } = props;

  return (
    <main className={classnames("appointment__card", "appointment__card--confirm")}>
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={onConfirm}>Confirm</Button>
        <Button danger onClick={onCancel}>Cancel</Button>
      </section>
    </main>
  );
}
