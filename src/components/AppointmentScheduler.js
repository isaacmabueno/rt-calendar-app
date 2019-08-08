import React, { Component } from 'react';
import Appointment from './Appointment';

let hours = ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM', '12AM', 'Start', 'End'];

class AppointmentScheduler extends Component {
    constructor(props) {
        super(props);

        this.state = { appointmentHours: [], appointments: [], reserving: false, currStart: 25, currEnd: 26 };

        this.selectStart = this.selectStart.bind(this);
        this.selectEnd = this.selectEnd.bind(this);
        this.toggleOpenClose = this.toggleOpenClose.bind(this);
        this.appointmentButton = this.appointmentButton.bind(this);
        this.reserveAppointment = this.reserveAppointment.bind(this);
        this.unreserveAppointment = this.unreserveAppointment.bind(this);
        this.editAppointment = this.editAppointment.bind(this);
        this.timeSelector = this.timeSelector.bind(this);
    }

    selectStart(e) {
        this.setState({ currStart: e.target.value });
    }

    selectEnd(e) {
        this.setState({ currEnd: e.target.value });
    }

    toggleOpenClose() {
        this.setState({ reserving: !this.state.reserving });
    }

    appointmentButton() {
        let start = parseInt(this.state.currStart, 10);
        let end = parseInt(this.state.currEnd, 10);
        this.reserveAppointment(start, end);
    }

    checkValidTimes(start, end) {
        if (start === 25 || start === 26) {
            alert("ERROR: Select a Start Time");
            return false;
        }
        if (end === 25 || end === 26) {
            alert("ERROR: Select an End Time");
            return false;
        }
        if (end < start) {
            alert("ERROR: End must be after Start");
            return false;
        }
        return true;
    }

    reserveAppointment(start, end) {
        if (!this.checkValidTimes(start, end)) {
            return;
        }
        for (let i = start; i <= end; i++) {
            if (this.state.appointmentHours.indexOf(i) !== -1) {
                console.log(this.state.appointmentHours);
                alert("Sorry, you can't book over an already booked appointment!");
                return;
            }
        }
        if (this.state.appointmentHours.length > 0) {
            alert("An appiontment already exists for this day! Click 'Okay' to proceed with scheduling more than one appointment");
        }
        let reserved = this.state.appointmentHours.slice();
        for (let i = start; i <= end; i++) {
            reserved.push(i);
        }
        let apptString = hours[start] + "-" + hours[end];
        let apptValues = { start: start, end: end };

        let newAppointments = this.state.appointments;
        newAppointments[apptString] = apptValues;

        this.setState({ appointments: newAppointments, appointmentHours: reserved, currStart: 25, currEnd: 26 });
    }

    unreserveAppointment(name, then = null) {
        let start = this.state.appointments[name].start;
        let end = this.state.appointments[name].end;
        let reserved = this.state.appointmentHours.slice();
        for (let i = parseInt(start, 10); i <= end; i++) {
            let e = reserved.indexOf(i);
            if (e !== -1) {
                reserved.splice(e, 1);
            }
        }
        let appointments = this.state.appointments;
        delete appointments[name];
        this.setState({ appointmentHours: reserved, appointments: appointments }, then);
    }

    appointmentsBooked() {
        let appointments = []
        for (let key in this.state.appointments) {
            appointments.push(<Appointment
                key={this.state.appointments[key].start}
                name={key}
                editAppointment={this.editAppointment}
                start={this.state.appointments[key].start}
                end={this.state.appointments[key].end}
                removeAppointment={this.unreserveAppointment} />)
        }
        return appointments;
    }

    editAppointment(name, newStart, newEnd) {
        if (!this.checkValidTimes(parseInt(newStart, 10), parseInt(newEnd, 10))) {
            return;
        }
        this.unreserveAppointment(name, this.reserveAppointment.bind(this, parseInt(newStart, 10), parseInt(newEnd, 10)));
    }

    timeSelector(func, val) {
        return (
            <select onChange={func} value={val}>
                {hours.map((label, e) => {
                    return (<option key={e.toString()} value={e}>{label}</option>)
                })}
            </select>
        );
    }

    render() {
        return (
            <div className="toggle">
                {this.appointmentsBooked()}
                {this.state.reserving ? <div className="schedule">
                    {this.timeSelector(this.selectStart, this.state.currStart)}
                    {this.timeSelector(this.selectEnd, this.state.currEnd)}
                    <span onClick={this.appointmentButton} className="edit-events">
                        Book it!
          </span>
                </div> : null}
                <span onClick={this.toggleOpenClose} className="edit-events">
                    {this.state.reserving ? "–" : "+"}
                </span>
            </div>
        );
    }
}

export default AppointmentScheduler;