import React from 'react';
import { subDays, addDays, format } from 'date-fns';
export default class DateStrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      selectedDay: ''
    };
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  getUnixId() {

  }

  handleDateClick(event) {
    this.state({
      selectedDay: 'day'
    });
  }

  render() {
    const { today } = this.state;
    return (
      <>
      <div className ="date-container">

      <div>{format(subDays(today, 3), 'E')}</div>
      <div>{format(subDays(today, 2), 'E')}</div>
      <div>{format(subDays(today, 1), 'E')}</div>
      <div>{format(today, 'E')}</div>
      <div>{format(addDays(today, 1), 'E')}</div>
      <div>{format(addDays(today, 2), 'E')}</div>
      <div>{format(addDays(today, 3), 'E')}</div>
      </div>
    </>
    );
  }
}
