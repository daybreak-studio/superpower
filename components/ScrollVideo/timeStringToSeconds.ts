export function timeStringToSeconds(timeString: string): number {
  const timeComponents = timeString.split(":");

  if (timeComponents.length === 1) {
    const secondsStr = timeComponents[0];
    const seconds = parseInt(secondsStr, 10);

    if (isNaN(seconds) || seconds < 0 || seconds >= 60) {
      throw new Error(
        "Invalid time string format. Please provide numerical values for seconds between 0 and 59.",
      );
    }

    return seconds;
  } else if (timeComponents.length === 2) {
    const [minutesStr, secondsStr] = timeComponents;
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);

    if (
      isNaN(minutes) ||
      isNaN(seconds) ||
      minutes < 0 ||
      minutes >= 60 ||
      seconds < 0 ||
      seconds >= 60
    ) {
      throw new Error(
        "Invalid time string format. Please provide numerical values for minutes and seconds between 0 and 59.",
      );
    }

    return minutes * 60 + seconds;
  } else if (timeComponents.length === 3) {
    const [hoursStr, minutesStr, secondsStr] = timeComponents.map((str) =>
      parseInt(str, 10),
    );

    if (isNaN(hoursStr) || isNaN(minutesStr) || isNaN(secondsStr)) {
      throw new Error(
        "Invalid time string format. Please provide numerical values for hours, minutes, and seconds.",
      );
    }

    const hours = hoursStr || 0;
    const minutes = minutesStr || 0;
    const seconds = secondsStr || 0;

    if (
      hours < 0 ||
      hours >= 24 ||
      minutes < 0 ||
      minutes >= 60 ||
      seconds < 0 ||
      seconds >= 60
    ) {
      throw new Error(
        "Invalid time values. Hours must be between 0 and 23, minutes and seconds must be between 0 and 59.",
      );
    }

    return hours * 3600 + minutes * 60 + seconds;
  } else {
    throw new Error(
      "Invalid time string format. Please provide a string in the format 'HH:MM:SS'.",
    );
  }
}
