/*
 * Author : Nitin Tyagi
 * Github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import { Toast_style } from '../Utility_Function'
import SweetAlert from '../common/MyGSweetAlert'

import axios from 'axios'

import { logToElasticsearch } from '../../../integration/http/logger'
import { logoutAction } from '../../../redux/actions/userAction'

import { toast } from 'react-toastify'
import { connect } from 'react-redux'

class Settings extends Component {
  constructor() {
    super()
    this.state = {
      viaEmail: '',
      feature_on: false,
      alert: null,
      redirect_: false,
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
  }
}

export default connect(null, mapDispatchToProps)(Settings)
