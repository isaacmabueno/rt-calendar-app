import React, { Component } from 'react';
import Logo from './Logo'
import Day from './Day';

let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
let monthNames = ["January 2019", "February 2019", "March 2019", "April 2019", "May 2019", "June 2019", "July 2019", "August 2019", "September 2019", "October 2019", "November 2019", "December 2019"];
let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

class Calendar extends Component {

    getDateCells() {
        // Start at 1+7 to start with the first cell and avoid negative firstDay.
        let firstDay = 8 + this.props.date.getDay() - (this.props.date.getDate() % 7);
        firstDay = firstDay % 7;
        let today = this.props.date.getDate();
        let dateCells = [];
        let days = monthDays[this.props.date.getMonth()];
        for (let i = 0 - firstDay; i < days; i++) {
            if (i < 0) {
                dateCells.push(<Day key={i + 1} isNull={true}></Day>);
            } else {
                dateCells.push(<Day key={i + 1} day={i + 1} isPast={today > i + 1}></Day>)
            }
        }
        return dateCells;
    }

    render() {
        return (
            <div className="header row flex-middle">
                <div className="primary">
                    <Logo />
                    <h2>{monthNames[this.props.date.getMonth()]}</h2>
                </div>
                <div className="days-container">
                    {daysOfWeek.map((day, e) => {
                        return (<p className="cell days-header" key={e.toString()} value={e}>{day}</p>)
                    })}
                </div>
                <div>
                    {this.getDateCells()}
                </div>
            </div>
        );
    }
}

export default Calendar;