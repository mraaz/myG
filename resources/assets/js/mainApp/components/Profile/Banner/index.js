import React from 'react';
import Background from './background';
import AnalyticsBox from '../../AnalyticsBox';
import Header from './header';
import { ignoreFunctions } from '../../../../common/render'

export default class Banner extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  render() {
    return(
      <div id="banner">
        <AnalyticsBox hideSuggestions containerStyle='analytics' />
        <Background background={this.props.profile.background} />
        <Header profile={this.props.profile} />
      </div>
    );
  }
}
