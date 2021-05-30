import { format, utcToZonedTime } from 'date-fns-tz';
const formatDate = props => {

  const formatDate = utcToZonedTime(props, 'America/Los_Angeles');
  const gameDate = format(formatDate, 'MM/dd');
  return gameDate;

};
export default formatDate;
