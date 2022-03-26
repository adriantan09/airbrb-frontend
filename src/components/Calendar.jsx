import { React } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

const Calendar = ({ value, onChange, isOpen, className }) => {
  return (
    <StyledCalendar
      calendarAriaLabel="Toggle calendar"
      clearAriaLabel="Clear value"
      dayAriaLabel="Day"
      monthAriaLabel="Month"
      yearAriaLabel="Year"
      nativeInputAriaLabel="Date"
      onChange={onChange}
      value={value}
      format="dd-MM-y"
      minDate={new Date()}
      rangeDivider="to"
      dayPlaceholder="DD"
      monthPlaceholder="MM"
      yearPlaceholder="YYYY"
      isOpen={isOpen}
      className={className}
    />
  )
}

Calendar.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  isOpen: PropTypes.bool,
  className: PropTypes.any,
}

export default Calendar

const StyledCalendar = styled(DateRangePicker)`
  .react-daterange-picker {
    &__wrapper {
      height: 58px;
      border-radius: 8px;
      border: 2px solid black;
      margin: 10px 0;
    }

    &__wrapper input {
      height: 20px;
    }

    &__inputGroup:before {
      margin: 5px 0;
      font-size: 11pt;
      font-weight: 500;
      display: block;
    }

    &__inputGroup {
      text-align: center;
    }

    &__calendar {
      width: 100%;
      height: 310px;
    }
  }

  .react-calendar {
    border-radius: 10px;
    overflow: hidden;
    width: 100%;

    &__month-view__days__day--weekend {
      color: black;
    }

    &__tile--active {
      color: white;
    }

    &__tile--now {
      color: white;
      background-color: #00A699;
    }
  }
`
