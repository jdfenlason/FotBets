import React from 'react';
import { format } from 'date-fns';

const Today = props => {
  const { today } = props;

  return (
    <>
   <div className = "date-item" onClick = {() => props.handleDateClick(event)} id = {format(today, 'YYYY-mm-dd')}>

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
