import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import moment from 'moment';

class DOBpicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DOB: {
                month: '01',
                day: '01',
                year: '1990',
            }
        }
    }

    handleChange = (e) => {
        const { name, value } = event.target;
        const { DOB } = this.state;
        this.setState({
            DOB: {
                ...DOB,
                [name]: value
            }
        }, () => {
            let event = {
                target: {
                    name: 'dob',
                    value: this.state.DOB.month + '/' + this.state.DOB.day + '/' + this.state.DOB.year
                }
            }
            this.props.change(event);
        });
    }

    getMonths = () => {
        let months = [];
        months.push(<option disabled>Month</option>);
        for (let i = 1; i <= 12; i++) {
            months.push(<option value={i < 10 ? '0' + JSON.stringify(i) : JSON.stringify(i)}>{i < 10 ? '0' + JSON.stringify(i) : JSON.stringify(i)}</option>);
        }
        return months;
    }

    getDays = () => {
        let days = [];
        days.push(<option disabled>Day</option>);
        for (let i = 1; i <= 31; i++) {
            days.push(<option value={i < 10 ? '0' + JSON.stringify(i) : JSON.stringify(i)}>{i < 10 ? '0' + JSON.stringify(i) : JSON.stringify(i)}</option>);
        }
        return days;
    }

    getYears = () => {
        let years = [];
        years.push(<option disabled>Year</option>);
        for (let i = 1970; i <= parseInt(moment().format('YYYY')); i++) {
            years.push(<option value={i < 10 ? '0' + JSON.stringify(i) : JSON.stringify(i)}>{i < 10 ? '0' + JSON.stringify(i) : JSON.stringify(i)}</option>);
        }
        return years;
    }

    fieldValue = (field) => {
        let final = '';
        if (this.props.value) {
            let arr = this.props.value.split("/");
            if (field == 'day') {
                final = arr[1];
            } else if (field == 'month') {
                final = arr[0];
            } else if (field == 'year') {
                final = arr[2];
            }
        }
        return final;
    }

    render() {
        return (
            <div className='row'>
                <div className='col-4'>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>MM</Form.Label>
                        <Form.Control name="month" as="select" value={this.fieldValue('month')} onChange={this.handleChange}>
                            {this.getMonths()};
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className='col-4'>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>DD</Form.Label>
                        <Form.Control name="day" as="select" value={this.fieldValue('day')} onChange={this.handleChange}>
                            {this.getDays()};
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className='col-4'>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>YYYY</Form.Label>
                        <Form.Control name="year" as="select" value={this.fieldValue('year')} onChange={this.handleChange}>
                            {this.getYears()};
                        </Form.Control>
                    </Form.Group>
                </div>
            </div>
        );
    }
}

function mapState(state) {

}

const actionCreators = {

}


const connectedDOBpicker = connect(mapState, actionCreators)(DOBpicker);
export { connectedDOBpicker as DOBpicker };