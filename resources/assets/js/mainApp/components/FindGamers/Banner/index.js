import React from 'react';
import AnalyticsBox from '../../AnalyticsBox';
import { ignoreFunctions } from '../../../../common/render'

export default class Banner extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  render() {
    return(
      <div id="find-gamers-banner">
        <AnalyticsBox containerStyle='analytics' />
      </div>
    );
  }
}
