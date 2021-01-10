import React from 'react';
import AnalyticsBox from '../../AnalyticsBox';
import Experiences from '../Experiences';
import { ignoreFunctions } from '../../../../common/render'

export default class Banner extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  renderExperiences = () => {
    const experiences = this.props.profile.gameExperiences || [];
    if (!experiences.length) return <span className="no-experiences" onClick={() => window.router.replace('/profile')}>Select your favourite game or the game you are currently playing.</span>;
    return <Experiences alias={this.props.profile.alias} gameExperiences={experiences} />
  }

  render() {
    return(
      <div id="find-gamers-banner">
        <AnalyticsBox onlyConnections containerStyle='analytics' />
        {this.renderExperiences()}
      </div>
    );
  }
}
