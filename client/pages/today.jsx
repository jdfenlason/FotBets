import React from 'react';
import { format, getUnixTime } from 'date-fns';

const Today = props => {
  const { today } = props;

  return (
    <>
   <div className = "date-item" onClick = {() => props.handleDateClick(event)} id = {getUnixTime(today)}>

        <span id = {getUnixTime(today)} className = "day-label">
        {format(today, 'E')}
        </span>
        <span id = {getUnixTime(today)} className ="date-label">
        {format(today, 'dd')}
        </span>

      </div>
</>
  );
};

export default Today;
