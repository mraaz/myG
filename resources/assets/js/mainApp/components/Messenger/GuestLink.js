
import React from 'react';
import { connect } from 'react-redux';

class GuestMessengerLink extends React.PureComponent {

  render() {
    return (
      <div className="messenger-link-guest-container"
        style={{ backgroundImage: `url(/assets/image/img/guest_background.jpg)` }}
      >
        
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return ({

  });
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestMessengerLink);
