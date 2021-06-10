import React from 'react';
import AddDays from './add-days';
import SubDays from './sub-days';
import Today from './today';
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

  handleDateClick(event, id) {

  }

  render() {
    return (
      <>
        <div className="day-container">
          <SubDays handleDateClick = {this.handleDateClick} today={this.state.today} />
          <Today handleDateClick = {this.handleDateClick} today = {this.state.today}/>
          <AddDays handleDateClick = {this.handleDateClick} today={this.state.today} />
        </div>
      </>
    );
  }
}
