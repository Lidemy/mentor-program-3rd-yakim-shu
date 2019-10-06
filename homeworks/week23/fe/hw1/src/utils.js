export function getDate(dateOrigin) {
  if (!dateOrigin) return 'who knows ?';
  const date = new Date(dateOrigin);
  return date.toDateString().substr(4, 6);
}

export function getYear(dateOrigin) {
  if (!dateOrigin) return 'who knows ?';
  const date = new Date(dateOrigin);
  return date.toDateString().substr(-4);
}

export default { getDate, getYear };