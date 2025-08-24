export function formatDateToCustomString(dateString: string): string {
  const date = new Date(dateString);

  const months = [
    "JAN.",
    "FEB.",
    "MAR.",
    "APR.",
    "MAY.",
    "JUN.",
    "JUL.",
    "AUG.",
    "SEP.",
    "OCT.",
    "NOV.",
    "DEC.",
  ];

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}
