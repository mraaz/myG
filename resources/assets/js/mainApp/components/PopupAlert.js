import React from 'react'
import { connect } from 'react-redux'
import SweetAlert from './common/MyGSweetAlert'

class PopupAlert extends React.PureComponent {
  render() {
    if (!this.props.alert) return null
    return (
      <div id='popup-alert'>
        <SweetAlert
          info
          showCancel
          confirmBtnText={window.messengerSweetAlert.confirmText}
          confirmBtnBsStyle='info'
          focusCancelBtn={true}
          focusConfirmBtn={false}
          showCloseButton={true}
          onConfirm={() => window.messengerSweetAlert.onConfirm()}
          onCancel={() => window.messengerSweetAlert.onCancel()}
        >
          {window.messengerSweetAlert.label}
        </SweetAlert>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    alert: state.alert.show
  }
}

export default connect(mapStateToProps)(PopupAlert)
