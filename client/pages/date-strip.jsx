import React from 'react';
import AddDays from './add-days';
import SubDays from './sub-days';
import { format } from 'date-fns';
export default class DateStrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      selectedDay: new Date()
    };
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  getMonth() {
    return format(this.state.selectedDay, 'MMMM');
  }

  handleDateClick(event) {
    this.state({
      selectedDay: 'day'
    });
  }

  render() {
    return (
      <>
        <div className="day-container">
          <AddDays today={this.state.today} />
          <SubDays today={this.state.today} />
        </div>
      </>
    );
  }
}
