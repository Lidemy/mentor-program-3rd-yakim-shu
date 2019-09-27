export default function getDate(dateOrigin) {
  if (!dateOrigin) return 'who knows ?';
  const date = new Date(dateOrigin);
  return (`
    ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}  
    ${date.getHours()}:${date.getMinutes()}
    `);
} 