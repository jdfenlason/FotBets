import React from 'react';
import { subDays, format, getUnixTime } from 'date-fns';
const SubDays = props => {
  const { today } = props;
  const numbers = [3, 2, 1];
  return (

    numbers.map((daysNums, index) => {
      const unix = getUnixTime(subDays(today, daysNums));
      return (
      <div className = "date-item" key = {index} onClick = {() => props.handleDateClick(event)} id = {unix}>
        <span id = {unix} className="day-label" >
        {format(subDays(today, daysNums), 'E')}
        </span>
        <span id = {unix} className = "date-label">
        {format(subDays(today, daysNums), 'dd')}
        </span>
      </div>
      );
    })
  );
};

export default SubDays;
