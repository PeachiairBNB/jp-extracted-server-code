import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import Axios from 'axios';
import Moment from 'moment';

import 'react-dates/lib/css/_datepicker.css';


import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

//import Component from 'react';
//export default React.PureComponent;
//export const pureComponentAvailable = true;


class BookingModule extends (React.Component) {
    constructor(props) {
      super(props);
      this.state = {
        bookingData: [],
        tripLength: 0,

      }
      this.getData = this.getData.bind(this);

    }

    getData() {
        let id = document.location.pathname;
        id = parseInt(id.match(/\d+/g));
        return Axios.get(`/api/booking/${id}`)
            .then((res) => {
                console.log(res.data)
                var availability = [];
                var reconverted = res.data[0].availability.split('-');
                reconverted.forEach((date) => {
                    availability.push(moment().dayOfYear(date));
                })
                var serviceFee = (res.data[0].price * 0.02).toFixed(0);
                var taxes = (res.data[0].price * 0.015).toFixed(0);
                this.setState({bookingData: res.data[0], blockedDates: availability, serviceFee, taxes})
                //console.log(res.data)
            })
            .catch(err => console.error('error on this ID', err))
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        const isDayBlocked = day => this.state.blockedDates.filter((d) => d.isSame(day, 'day')).length > 0;
        if (this.state.bookingData) {
            return (
  <div className = "app">
    <header className = "Nav">${this.state.bookingData.price} per night
    <div>***** {this.state.bookingData.numReviews}</div>
    </header>
   <DateRangePicker
  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
  onDatesChange={({ startDate, endDate }) => {
      if (endDate && startDate) {
          var tripLength = endDate.diff(startDate, 'days');
      }
      this.setState({ startDate, endDate, tripLength })
    }} // PropTypes.func.isRequired,
  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
  isDayBlocked={isDayBlocked}
/>
<br></br>
<div>
<table>
    <tbody>
    <tr>
        <td>${this.state.bookingData.price} x {this.state.tripLength} night{this.state.tripLength !== 1? 's' : ''}</td>
        <td>${this.state.bookingData.price * this.state.tripLength}</td>
    </tr>
    <tr>
        <td>Cleaning Fee</td>
        <td>${this.state.bookingData.cleaningFee || this.state.bookingData.cleaningfee}</td>
    </tr>
    <tr>
        <td>Service Fee</td>
        <td>${this.state.serviceFee}</td>
    </tr>
    <tr>
        <td>Occupancy taxes and fees</td>
        <td>${this.state.taxes}</td>
    </tr>
    <tr>
        <td><strong>Total</strong></td>
        <td><strong>${(this.state.bookingData.price * this.state.tripLength) + (this.state.bookingData.cleaningFee || this.state.bookingData.cleaningfee) + Number(this.state.taxes) + Number(this.state.serviceFee)}</strong></td>
    </tr>
    </tbody>
</table>
<button name="button">Book</button>
<div>You won't be charged yet</div>

</div>

</div>



            )
        } else {
            return (
                <div>*loading*</div>

            )
        }
    }
  }



  //
 // ReactDOM.render(<App />, document.getElementById('app'));


 window.BookingModule = BookingModule;