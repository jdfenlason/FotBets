import React from 'react';
import { parseISO, isToday } from 'date-fns';
import { isFuture } from 'date-fns/esm';
const NoMatchesToday = props => {
  const { selectedDay } = props;
  if (!isToday(parseISO(selectedDay)) && !isFuture(parseISO(selectedDay))) {
    return (
 <div className="row">
        <div className="no-game">
          <h1>No Past Fixtures</h1>
        </div>
      </div>
    );

  } else {

    return (
    <div className="row">
      <div className="no-game">
        <h1>No Upcoming Fixtures</h1>
      </div>
    </div>
    );
  }
};
export default NoMatchesToday;
