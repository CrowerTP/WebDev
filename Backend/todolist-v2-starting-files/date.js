//jshint esversion:6

export function getDate() {

  const currentDate = new Date();
  const localTime = new Intl.DateTimeFormat('default', {
    timeZone: "Europe/Budapest",
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(currentDate);

  return localTime;

}