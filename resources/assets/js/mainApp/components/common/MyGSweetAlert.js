
import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { getAssetUrl } from '../../../common/assets';

export default class MyGSweetAlert extends React.Component {
  render() {
    const customIcon = this.props.info ?
      getAssetUrl('ic_sweet_alert_info') : this.props.danger ?
        getAssetUrl('ic_sweet_alert_danger') : this.props.warning ?
          getAssetUrl('ic_sweet_alert_warning') : this.props.success ?
            getAssetUrl('ic_sweet_alert_success') : null;
    const props = { ...this.props };
    props.info = null;
    props.danger = null;
    props.warning = null;
    props.success = null;
    return (
      <SweetAlert {...props} custom customIcon={customIcon}
        style={{
          backgroundColor: "#181A1C",
          color: "#425156",
          padding: 20,
          whiteSpace: 'pre-wrap',
        }}
        cancelBtnStyle={{
          backgroundColor: "#2D363A",
          color: "#FFFFFF",
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 8,
          paddingBottom: 8,
          borderRadius: 16,
          marginRight: 16,
          boxShadow: null,
          textTransform: "lowercase",
          fontFamily: "Montserrat Alternates",
          outline: 'none',
        }}
        confirmBtnStyle={{
          backgroundColor: "#E5C746",
          color: "#2D363A",
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 8,
          paddingBottom: 8,
          borderRadius: 16,
          marginLeft: 16,
          boxShadow: null,
          textTransform: "lowercase",
          fontFamily: "Montserrat Alternates",
          outline: 'none',
        }}
      >
        {this.props.children}
      </SweetAlert>
    );
  }

}