import React from 'react';
import { format } from 'date-fns';

const Today = props => {
  const { selectedDay, today } = props;

  return (
    <>
   <div className = {selectedDay === format(today, 'yyyy-MM-dd') ? 'selected-date date-item' : 'date-item'} onClick = {() => props.handleDateClick(event)} id = {format(today, 'yyyy-MM-dd')}>

        <span className = "day-label">
        {format(today, 'E')}
        </span>
        <span className ="date-label">
        {format(today, 'dd')}
        </span>

      </div>
</>
  );
};

export default Today;
