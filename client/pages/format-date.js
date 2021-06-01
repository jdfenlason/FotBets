import { format, formatISO, parseISO } from 'date-fns';
const formatDate = props => {
  const dateFormated = parseISO(props);
  const todayDate = formatISO(dateFormated, { representation: 'date' });
  const gameDate = format(parseISO(todayDate), 'EEEE MMMM do');
  return gameDate;

};
export default formatDate;
