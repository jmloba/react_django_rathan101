export function getFormattedDate() {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  return formattedDate;
}