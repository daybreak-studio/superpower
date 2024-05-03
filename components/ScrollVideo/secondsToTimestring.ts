export function secondsToTimeString(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const remainingSecondsWithDecimals = remainingSeconds.toFixed(2); // Ensure 2 decimal places

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const [integerPart, decimalPart] = remainingSecondsWithDecimals.split(".");
  const formattedSeconds = integerPart.padStart(2, "0");
  const formattedMilliseconds = (decimalPart || "00").padEnd(2, "0"); // Pad with zeros if needed

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}
