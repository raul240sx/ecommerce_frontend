const dateFormatter = new Intl.DateTimeFormat('es-CL', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

export const formatDate = (dateString) => {
  return dateFormatter
    .format(new Date(dateString))
    .replace(',', '');
};