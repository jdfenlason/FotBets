import React from 'react';
import AddDays from './add-days';
import SubDays from './sub-days';
import Today from './today';
import { format } from 'date-fns';
import TodayFixtures from './today-fixtures';
export default class DateStrip extends React.Component {
  constructor(props) {

    super(props);
    const formatDay = format(new Date(), 'yyyy-MM-dd');
    this.state = {
      today: new Date(),
      selectedDay: formatDay,
      formatDay: formatDay
    };
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  handleDateClick(event) {
    const id = event.target.closest('div').id;
    this.setState({
      selectedDay: id
    });

  }

  componentDidUpdate(props) {
    const { fixtures } = props;
    const { selectedDay } = this.state;
    const dayOfFixtures = fixtures.filter(fixtures => {
      return fixtures.fixture.date.slice(0, 10) === selectedDay;
    });
    return dayOfFixtures;
  }

  render() {
    const { today, selectedDay, formatDay } = this.state;
    return (
      <>

        <div className="day-container">
          <SubDays handleDateClick = {this.handleDateClick} today={today} selectedDay = {selectedDay}/>
          <Today handleDateClick = {this.handleDateClick} today = {today} selectedDay = {selectedDay}/>
          <AddDays handleDateClick = {this.handleDateClick} today={today} selectedDay = {selectedDay}/>
        </div>
          <TodayFixtures formatDay = {formatDay}selectedDay = {selectedDay}/>
      </>
    );
  }
}
