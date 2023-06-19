/* Button.js */
import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button({ confirm, danger, onClick, disabled, children }) {
  const buttonClass = classNames("button", {
    "button--confirm": confirm,
    "button--danger": danger
  });

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  onClick: () => {} // Default empty click handler
};
