import React from 'react';
import { formatDate } from '../lib';
const TodayFixtures = props => {
  const { selectedDay, formatDay } = props;
  if (formatDay === selectedDay) {
    return (
      <div className="fixture-date-heading">
        <h1>Today&apos;s Fixtures</h1>
      </div>
    );
  } else {
    return (
      <div className="fixture-date-heading">
        <h1>{formatDate(selectedDay)}</h1>
      </div>
    );
  }
};

export default TodayFixtures;
