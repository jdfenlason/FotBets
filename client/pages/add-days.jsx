import React from 'react';

import { addDays, format } from 'date-fns';
const AddDays = props => {

  const { today } = props;
  const numbers = [1, 2, 3];
  return (

    numbers.map((daysNums, index) => {
      return (
      <div key = {index}>
        <h4>
        {format(addDays(today, daysNums), 'E')}
        </h4>
        <h3>
        {format(addDays(today, daysNums), 'dd')}
        </h3>
      </div>
      );
    })
  );
};
export default AddDays;
