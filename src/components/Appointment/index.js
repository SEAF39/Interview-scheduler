/* index.js */

import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const SAVING = "SAVING";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(error => {
        console.error(error);
        transition(ERROR_SAVE, true);
      });
  };

  const destroy = (id) => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && (
        <Empty
          onAdd={() => transition(CREATE)}
        />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          id={props.id}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={() => transition(SHOW)}
        />
      )}

      {mode === SAVING && <Status mode={mode} />}
      {mode === DELETING && <Status mode={mode} />}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          id={props.id}
          onCancel={back}
          onConfirm={destroy}
        />
      )}

      {mode === ERROR_SAVE && <Error mode={mode} onClose={back} />}
      {mode === ERROR_DELETE && <Error mode={mode} onClose={back} />}
    </article>
  );
}


