/* selectors.js */
export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find((d) => d.name === day);

  if (!selectedDay) {
    return [];
  }
  const appointmentIds = selectedDay.appointments;
  const appointmentsForDay = appointmentIds.map((appointmentId) => {
    return state.appointments[appointmentId];
  });
  return appointmentsForDay;
}
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const { student, interviewer } = interview;
  return {
    student,
    interviewer: state.interviewers[interviewer]
  };
}
export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find((d) => d.name === day);
  if (!selectedDay) {
    return [];
  }

  const interviewers = selectedDay.interviewers.map(
    (interviewerId) => state.interviewers[interviewerId]
  );

  return interviewers;
}
