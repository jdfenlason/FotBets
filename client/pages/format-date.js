import { format, parseISO } from 'date-fns';
const formatDate = props => {
  const gameDate = format(parseISO(props), 'MM-dd');
  return gameDate;

};
export default formatDate;
