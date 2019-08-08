import React, { Component } from 'react';
import AppointmentScheduler from './AppointmentScheduler';




class Day extends Component {
    constructor(props) {
        super(props);

        this.dayCellClasses = "day-cell"
        if (this.props.isPast) {
            this.dayCellClasses += " disabled-cell"
        } else if (this.props.isNull) {
            this.daycellClasses += " hide-cell"
        } else {
            this.dayCellClasses += " date-cell"
        }
    }


    render() {
        return (
            <div className={this.dayCellClasses}>
                <span>{this.props.day || "null"}</span>
                {(this.props.isPast || this.props.isNull) ? null : <AppointmentScheduler />}
            </div>
        )
    }
}

export default Day;