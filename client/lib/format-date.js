import { format, formatISO, parseISO } from 'date-fns';
const formatDate = props => {
  const dateFormated = parseISO(props);
  const todayDate = formatISO(dateFormated, { representation: 'date' });
  const gameDate = format(parseISO(todayDate), 'EEEE MMMM do');
  return gameDate;

};

const formatPastResult = props => {
  const dateParse = parseISO(props);
  const dateFormat = format(dateParse, 'dd-MM-YYYY');
  return dateFormat;
};
export { formatDate, formatPastResult };
