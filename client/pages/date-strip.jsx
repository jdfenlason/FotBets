import React from 'react';
import AddDays from './add-days';
import SubDays from './sub-days';
import Today from './today';
import { format } from 'date-fns';
export default class DateStrip extends React.Component {
  constructor(props) {
    super(props);
    const formatDay = format(new Date(), 'yyyy-MM-dd');
    this.state = {
      today: new Date(),
      selectedDay: formatDay
    };
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  getMonth() {
    return format(this.state.selectedDay, 'MMMM');
  }

  handleDateClick(event) {
    const id = event.target.closest('div').id;
    this.setState({
      selectedDay: id
    });

  }

  render() {
    return (
      <>
        <div className="day-container">
          <SubDays handleDateClick = {this.handleDateClick} today={this.state.today} selectedDay = {this.state.selectedDay}/>
          <Today handleDateClick = {this.handleDateClick} today = {this.state.today} selectedDay = {this.state.selectedDay}/>
          <AddDays handleDateClick = {this.handleDateClick} today={this.state.today} selectedDay = {this.state.selectedDay}/>
        </div>
      </>
    );
  }
}
