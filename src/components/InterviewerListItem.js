/* InterviewerListItem.js */
import React from "react";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const classNames = ["interviewers__item"];
  if (props.selected) {
    classNames.push("interviewers__item--selected");
  }

  return (
    <li className={classNames.join(" ")} onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
