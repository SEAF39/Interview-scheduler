/* DayList.js */

import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;

  const dayItems = days.map((dayObj) => (
    <DayListItem
      key={dayObj.name}
      name={dayObj.name}
      spots={dayObj.spots}
      selected={dayObj.name === day}
      setDay={setDay}
    />
  ));

  return <ul>{dayItems}</ul>;
}


