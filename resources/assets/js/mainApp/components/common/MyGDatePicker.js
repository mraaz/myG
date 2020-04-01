import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/common/MyGDatePickerStyles.scss'

const MyGDatePicker = ({
  selected,
  onChange,
  showTimeSelect,
  onBlur,
  onFocus,
  timeFormat,
  timeIntervals,
  dateFormat,
  timeCaption,
  className,
  todayButton,
  shouldCloseOnSelect,
  children,
}) => {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
    },
  }

  return (
    <div style={styles.container}>
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
        onBlur={onBlur}
        onFocus={onFocus}
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
}

export default MyGDatePicker
