import React from 'react';

import { addDays, format, getUnixTime } from 'date-fns';
const AddDays = props => {

  const { today } = props;
  const numbers = [1, 2, 3];
  return (

    numbers.map((daysNums, index) => {
      const unix = getUnixTime(addDays(today, daysNums));

      return (
      <div className = "date-item" key = {index} id = {unix} onClick = {() => props.handleDateClick(event)} >
        <span id = {unix} className = "day-label">
        {format(addDays(today, daysNums), 'E')}
        </span>
        <span id = {unix} className = "date-label">
        {format(addDays(today, daysNums), 'dd')}
        </span>
      </div>
      );
    })
  );
};
export default AddDays;
