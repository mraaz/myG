import React from 'react';
import { connect } from 'react-redux';
import { ignoreFunctions } from '../../../../common/render'

class Monthly extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  render() {
    return(
      <div id="quests">
        Monthly
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Monthly)

