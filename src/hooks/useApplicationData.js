/* useApplicationData.js */

import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
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
    ]).then(([daysRes, appointmentsRes, interviewersRes]) => {
      setState(prevState => ({
        ...prevState,
        days: daysRes.data,
        appointments: appointmentsRes.data,
        interviewers: interviewersRes.data
      }));
    });
  }, []);

  function calcSpots(day, days, appointments) {
    const currentDay = days.find(d => d.name === day);
    const bookedSpots = currentDay.appointments.reduce(
      (count, appointmentId) =>
        appointments[appointmentId].interview ? count + 1 : count,
      0
    );
    return currentDay.appointments.length - bookedSpots;
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

    const days = state.days.map(day => ({
      ...day,
      spots: calcSpots(day.name, state.days, appointments)
    }));

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => setState(prevState => ({ ...prevState, appointments, days })));
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = state.days.map(day => ({
      ...day,
      spots: calcSpots(day.name, state.days, appointments)
    }));

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => setState(prevState => ({ ...prevState, appointments, days })));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}

