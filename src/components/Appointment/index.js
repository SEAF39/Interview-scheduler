/* index.js */

import React from "react";
import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CANCEL = "CANCEL";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {transition(SHOW);
  })
  .catch((error) => {
    console.log("Error: ", error);
    transition(ERROR_SAVE, true);
  });
};

  const destroy = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id, props.interview)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
       console.log("Error: ", error);
       transition(ERROR_DELETE, true);
    })
  };
  
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={() => transition(SHOW)}
        onSave={save}
      />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CANCEL && (
        <Confirm
          message={"Are you sure you want to delete this appointment?"}
          onCancel={() => transition(SHOW)}
          onConfirm={destroy}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_SAVE && <Error message="Error while saving." onClose={() => {
        if(props.id) transition(SHOW);
        else transition(EMPTY);
        }} />}
       {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment" onClose={() => transition(SHOW, true)} />
      )}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CANCEL)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onConfirm={destroy}
          onCancel={back}
        />
      )}
    </article>
  );
}
