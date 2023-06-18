/* InterviewerListItem.js */

import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}









/* import React from "react";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const classNames = ["interviewers__item"];
  if (props.selected) {
    classNames.push("interviewers__item--selected");
  }

  return (
    <li className={classNames.join(" ")} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
 */