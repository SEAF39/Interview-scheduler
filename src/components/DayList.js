/* DayList.js */
import React from "react";
import DayListItem from "./DayListItem"; // Import the DayListItem component

export default function DayList(props) {
  // Map over the days array and create a new array of DayListItem components
  const dayItems = props.days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  ));

  return <ul>{dayItems}</ul>; // Render the array of DayListItem components
}
