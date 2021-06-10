import React from 'react';
import { subDays, format } from 'date-fns';
const SubDays = props => {
  const { today } = props;
  const numbers = [1, 2, 3];
  return (

    numbers.map((daysNums, index) => {
      return (
      <div key = {index}>
        <h4>
        {format(subDays(today, daysNums), 'E')}
        </h4>
        <h3>
        {format(subDays(today, daysNums), 'dd')}
        </h3>
      </div>
      );
    })
  );
};

export default SubDays;
