import React from 'react';

import { addDays, format } from 'date-fns';
const AddDays = props => {

  const { today } = props;
  const numbers = [1, 2, 3];
  return (

    numbers.map((daysNums, index) => {
      const formatDay = format(addDays(today, daysNums), 'yyyy-MM-dd');

      return (
      <div className = "date-item" key = {index} id = {formatDay} onClick = {() => props.handleDateClick(event)} >
        <span className = "day-label">
        {format(addDays(today, daysNums), 'E')}
        </span>
        <span className = "date-label">
        {format(addDays(today, daysNums), 'dd')}
        </span>
      </div>
      );
    })
  );
};
export default AddDays;
