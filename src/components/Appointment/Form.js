/* Form.js */

import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import PropTypes from "prop-types";

export default function Form(props) {
  const [formData, setFormData] = useState({
    name: props.name || "",
    interviewer: props.interviewer || null,
  });
  const [error, setError] = useState("");

  const reset = () => {
    setFormData({ name: "", interviewer: null });
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const validate = () => {
    if (formData.name === "") {
      setError("Student Name Cannot be Blank");
      return;
    }
    setError("");
    props.onSave(formData.name, formData.interviewer);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={formData.name}
            onChange={handleInputChange}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={formData.interviewer}
          onChange={(interviewer) =>
            setFormData((prevData) => ({ ...prevData, interviewer }))
          }
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

Form.propTypes = {
  name: PropTypes.string,
  interviewer: PropTypes.number,
  interviewers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

