export function timeStringToMilliseconds(timeString: string): number | null {
  const timeComponents = timeString.split(":").map((str) => parseInt(str, 10));

  if (timeComponents.some(isNaN)) {
    throw "Invalid time string format. Please provide numerical values for hours, minutes, and seconds.";
  }

  const componentsCount = timeComponents.length;

  if (componentsCount === 1) {
    const [seconds] = timeComponents;
    if (seconds < 0 || seconds >= 60) {
      throw "Invalid time string format. Please provide numerical values for seconds between 0 and 59.";
    }
    return seconds * 1000;
  }

  if (componentsCount === 2 || componentsCount === 3) {
    const [hours = 0, minutes = 0, seconds = 0] = timeComponents;

    if (
      hours < 0 ||
      hours >= 24 ||
      minutes < 0 ||
      minutes >= 60 ||
      seconds < 0 ||
      seconds >= 60
    ) {
      throw "Invalid time values. Hours must be between 0 and 23, minutes and seconds must be between 0 and 59.";
    }

    const millisecondsInHour = 3600000;
    const millisecondsInMinute = 60000;
    const millisecondsInSecond = 1000;

    return (
      hours * millisecondsInHour +
      minutes * millisecondsInMinute +
      seconds * millisecondsInSecond
    );
  }

  throw "Invalid time string format. Please provide a string in the format 'HH:MM:SS'.";
}
