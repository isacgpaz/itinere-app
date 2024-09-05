export function generateTimeSlots() {
  const timeSlots = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 10) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      timeSlots.push(`${formattedHour}:${formattedMinutes}`);
    }
  }

  return timeSlots;
}
