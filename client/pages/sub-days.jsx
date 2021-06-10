import React from 'react';
import { subDays, format } from 'date-fns';
const SubDays = props => {
  const { today } = props;
  const numbers = [3, 2, 1];
  return (

    numbers.map((daysNums, index) => {
      const formatDay = format(subDays(today, daysNums), 'yyyy-MM-dd');
      return (
      <div className = "date-item" key = {index} onClick = {() => props.handleDateClick(event)} id = {formatDay}>
        <span className="day-label" >
        {format(subDays(today, daysNums), 'E')}
        </span>
        <span className = "date-label">
        {format(subDays(today, daysNums), 'dd')}
        </span>
      </div>
      );
    })
  );
};

export default SubDays;
