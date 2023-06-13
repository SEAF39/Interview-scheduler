/* Application.js */

import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";


import DayList from "./DayList";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    setState((prevState) => ({ ...prevState, day }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [daysResponse, appointmentsResponse, interviewersResponse] =
          await Promise.all([
            axios.get('http://localhost:8001/api/days'),
            axios.get('http://localhost:8001/api/appointments'),
            axios.get('http://localhost:8001/api/interviewers'),
          ]);

        setState((prevState) => ({
          ...prevState,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewersResponse.data,
        }));
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState((prevState) => ({
      ...prevState,
      appointments,
    }));
  };

  const interviewersList = getInterviewersForDay(state, state.day);

  const schedule = getAppointmentsForDay(state, state.day).map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersList}
        bookInterview={bookInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}



















/* 
import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview,getInterviewersForDay } from "../helpers/selectors";




export default function Application(props) {
  const { state } = props;

  const appointments = getAppointmentsForDay(state, "Monday");
  const interviewers = getInterviewersForDay(state, "Monday");

  const appointmentComponents = appointments.map((appointment) => (
    <Appointment
      key={appointment.id}
      {...appointment}
      interviewers={interviewers}
    />
  ));

  return (
    <main className="layout">
      <section className="schedule">
        {appointmentComponents}
      </section>
    </main>
  );
}

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
  };

  useEffect(() => {
    const fetchAppointments = axios.get('http://localhost:8001/api/appointments');
    const fetchDays = axios.get('http://localhost:8001/api/days');
    const fetchInterviewers = axios.get('http://localhost:8001/api/interviewers');
  
    Promise.all([fetchDays, fetchAppointments, fetchInterviewers])
      .then((responses) => {
        const [daysResponse, appointmentsResponse, interviewersResponse] = responses;
        console.log(daysResponse.data); // response from days API call
        console.log(appointmentsResponse.data); // response from appointments API call
        console.log(interviewersResponse.data); // response from interviewers API call
        
        // Update the state with the retrieved data
        setState(prevState => ({
          ...prevState,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewersResponse.data
        }));
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);


  const schedule = getAppointmentsForDay(state, state.day).map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
 */