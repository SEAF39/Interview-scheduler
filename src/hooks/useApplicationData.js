/* useApplicationData.js */

import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function setDay(day) {
    setState(prevState => ({ ...prevState, day }));
  }

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then(([days, appointments, interviewers]) => {
      setState(prevState => ({
        ...prevState,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      }));
    })
    .catch(error => console.log(error));
  }, []);

  function calcSpot(day, days, appointments) {
    let bookedSpots = 0;
    let totalSpots = 0;
    days.forEach(i => {
      totalSpots++;
      if (i.name === day) {
        i.appointments.forEach(j => {
          if (appointments[j].interview !== null) {
            bookedSpots++;
          }
        });
      }
    });
    return totalSpots - bookedSpots;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = state.days.map(day => {
      if (state.day === day.name) {
        day.spots = calcSpot(state.day, state.days, appointments);
        return day;
      } else {
        return day;
      }
    });

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => setState(prevState => ({
        ...prevState,
        appointments,
        days
      })));
  }

  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = state.days.map(day => {
      if (state.day === day.name) {
        day.spots = calcSpot(state.day, state.days, appointments);
        return day;
      } else {
        return day;
      }
    });

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => setState(prevState => ({
        ...prevState,
        appointments,
        days
      })));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
