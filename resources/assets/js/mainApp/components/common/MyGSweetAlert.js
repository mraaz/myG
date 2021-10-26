import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { getAssetUrl } from '../../../common/assets'

export default class MyGSweetAlert extends React.Component {
  componentDidMount() {
    // Inject class into SweetAlert text box.
    const sweetAlertTextBox = document.querySelector('#popup-alert > div > div > div > div:nth-child(4)')
    if (sweetAlertTextBox) sweetAlertTextBox.classList.add('sweet-alert-text-box')
  }

  render() {
    const customIcon = this.props.info
      ? getAssetUrl('ic_sweet_alert_info')
      : this.props.danger
      ? getAssetUrl('ic_sweet_alert_danger')
      : this.props.warning
      ? getAssetUrl('ic_sweet_alert_warning')
      : this.props.success
      ? getAssetUrl('ic_sweet_alert_success')
      : null
    const props = { ...this.props }
    props.info = null
    props.danger = null
    props.warning = null
    props.success = null
    return (
      <SweetAlert
        {...props}
        custom
        customIcon={window.innerWidth <= 575 ? null : customIcon}
        style={{
          backgroundColor: '#181A1C',
          color: '#425156',
          padding: window.innerWidth <= 575 ? '64px 12px' : 20,
          whiteSpace: 'pre-wrap'
        }}
        cancelBtnStyle={{
          backgroundColor: '#2D363A',
          color: '#fff',
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 8,
          paddingBottom: 8,
          borderRadius: 16,
          marginRight: 16,
          boxShadow: null,
          textTransform: 'lowercase',
          fontFamily: 'Montserrat',
          outline: 'none'
        }}
        confirmBtnStyle={{
          backgroundColor: '#E5C746',
          color: '#2D363A',
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 8,
          paddingBottom: 8,
          borderRadius: 16,
          marginLeft: 16,
          boxShadow: null,
          textTransform: 'lowercase',
          fontFamily: 'Montserrat',
          outline: 'none'
        }}
      >
        {this.props.children}
      </SweetAlert>
    )
  }
}
