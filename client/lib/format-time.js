import { fromUnixTime, format } from 'date-fns';
const formatTime = props => {
  const unix = fromUnixTime(props);
  const gameTime = format(unix, 'KK:mm bb');
  return gameTime;
};
export default formatTime;
