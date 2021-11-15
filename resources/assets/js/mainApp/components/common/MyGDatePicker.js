import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/common/MyGDatePickerStyles.scss'
import moment from 'moment'

const MyGDatePicker = ({
  selected,
  onChange,
  showTimeSelect,
  timeFormat,
  timeIntervals,
  dateFormat,
  timeCaption,
  className,
  todayButton,
  shouldCloseOnSelect,
  children,
  minDate,
  maxDate,
  style=true,
  ...props
}) => {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    }
  }

  return (
    <div style={style ? styles.container : {}}>
      <DatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect={showTimeSelect}
        timeFormat={timeFormat}
        timeIntervals={timeIntervals}
        dateFormat={dateFormat}
        timeCaption={timeCaption}
        className={className}
        todayButton={todayButton}
        shouldCloseOnSelect={shouldCloseOnSelect}
        minDate={minDate}
        maxDate={maxDate}
        {...props}
      />
      {children}
    </div>
  )
}

MyGDatePicker.defaultProps = {
  showTimeSelect: true,
  timeFormat: 'HH:mm',
  timeIntervals: 15,
  dateFormat: 'lll',
  timeCaption: 'time',
  className: 'start-date-box',
  todayButton: 'Today',
  shouldCloseOnSelect: true,
  minDate: moment()
}

export default MyGDatePicker
