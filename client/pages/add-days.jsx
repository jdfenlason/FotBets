import React from 'react';

import { addDays, format } from 'date-fns';
const AddDays = props => {

  const { today, selectedDay } = props;
  const dayNumbers = [1, 2, 3];
  return (

    dayNumbers.map((daysNums, index) => {
      const formatDay = format(addDays(today, daysNums), 'yyyy-MM-dd');

      return (
      <div className = {selectedDay === formatDay ? 'selected-date date-item' : 'date-item'} key = {index} id = {formatDay} onClick = {() => props.handleDateClick(event)} >
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
