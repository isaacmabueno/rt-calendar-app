import React, { Component } from 'react';

let labels = ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM', '12AM'];

class Appointment extends Component {
    constructor(props) {
        super(props);

        this.state = { selectingStart: false, selectingEnd: false }
        this.startAppt = this.startAppt.bind(this);
        this.selectStart = this.selectStart.bind(this);
        this.changeStart = this.ChangeStart.bind(this);
        this.getEnd = this.getEnd.bind(this);
        this.selectEnd = this.selectEnd.bind(this);
        this.changeEnd = this.ChangeEnd.bind(this);
        this.deleteAppointment = this.deleteAppointment.bind(this);
    }

    startAppt() {
        if (this.state.selectingStart) {
            return (this.getSelector(this.ChangeStart, this.props.start));
        } else {
            return (<span onClick={this.selectStart}>{labels[this.props.start]}</span>);
        }
    }
    selectStart() {
        this.setState({ selectingStart: true });
    }
    ChangeStart(e) {
        this.props.editAppointment(this.props.name, e.target.value, this.props.end);
        this.setState({ selectingStart: false });
    }

    getEnd() {
        if (this.state.selectingEnd) {
            return (this.getSelector(this.ChangeEnd, this.props.end));
        } else {
            return (<span onClick={this.selectEnd}>{labels[this.props.end]}</span>);
        }
    }
    selectEnd() {
        this.setState({ selectingEnd: true });
    }

    ChangeEnd(e) {
        this.props.editAppointment(this.props.name, this.props.start, e.target.value);
        this.setState({ selectingEnd: false });
    }

    getSelector(func, val) {
        return (
            <select onChange={func} value={val}>
                {labels.map((label, e) => {
                    return (<option key={e.toString()} value={e}>{label}</option>)
                })}
            </select>
        );
    }

    deleteAppointment() {
        this.props.removeAppointment(this.props.name);
    }

    render() {
        return (
            <div className="appointment">
                {this.startAppt()}-{this.getEnd()} <span onClick={this.deleteAppointment} className="delete-appointment">Delete</span>
            </div>
        )
    }
}

export default Appointment;
