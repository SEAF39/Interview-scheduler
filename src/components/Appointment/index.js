/* index.js */
import React, { useState } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const [mode, setMode] = useState(props.interview ? SHOW : EMPTY);

  function transition(newMode) {
    setMode(newMode);
  }

  function back() {
    setMode(EMPTY);
  }

  function save(name, interviewer) {
    if (!name || !interviewer) {
      return;
    }
    setMode(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    props
      .bookInterview(props.id, interview)
      .then(() => {
        setMode(SHOW);
      })
      .catch(() => setMode(ERROR_SAVE));
  }

  function deleteFunc() {
    setMode(DELETING);
    props
      .cancelInterview(props.id)
      .then(() => {
        setMode(EMPTY);
      })
      .catch(() => setMode(ERROR_DELETE));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          message={"Are you sure you would like to delete?"}
          onConfirm={deleteFunc}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"Could not create appointment"}
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Could not cancel appointment"}
          onClose={() => back()}
        />
      )}
    </article>
  );
}
