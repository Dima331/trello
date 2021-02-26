export function getFormatDate(date: Date): string {
  const currentDate = new Date(date);
  const formatDate = `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

  return formatDate;
}

export function isDateExpired(date: Date): boolean {
  const now = new Date();
  const currentDate = new Date(date);

  if (now > currentDate) {
    return true;
  }

  return false;
}
