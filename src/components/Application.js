/* Application.js */

import React, { Component } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};

class Application extends Component {
  state = {
    day: "Monday",
    days: ["Monday", "Tuesday", "Wednesday"],
    appointments,
    interviewers: {}
  };

  renderAppointments() {
    const { day, appointments } = this.state;
    const dailyAppointments = appointments[day];

    if (!dailyAppointments) {
      return null;
    }

    return dailyAppointments.map(appointment => (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
      />
    ));
  }

  setDay = day => {
    this.setState({ day });
  };

  render() {
    const { days } = this.state;

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
            <DayList days={days} value={this.state.day} onChange={this.setDay} />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
        </section>
        <section className="schedule">
          {this.renderAppointments()}
          <Appointment key="last" time="5pm" />
        </section>
      </main>
    );
  }
}

export default Application;
