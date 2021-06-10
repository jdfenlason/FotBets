import React from 'react';
import AddDays from './add-days';
import SubDays from './sub-days';
import Today from './today';
import TodayFixtures from './today-fixtures';
const DateStrip = props => {
  const { today, selectedDay, formatDay, handleDateClick } = props;
  return (
    <>
      <div className="day-container">
        <SubDays
          handleDateClick={handleDateClick}
          today={today}
          selectedDay={selectedDay}
        />
        <Today
          handleDateClick={handleDateClick}
          today={today}
          selectedDay={selectedDay}
        />
        <AddDays
          handleDateClick={handleDateClick}
          today={today}
          selectedDay={selectedDay}
        />
      </div>
      <TodayFixtures formatDay={formatDay} selectedDay={selectedDay} />
    </>
  );
};

export default DateStrip;
