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
