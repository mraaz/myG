import React from 'react';
import get from 'lodash.get';
import { getAssetUrl } from '../../../../common/assets';
import { ignoreFunctions } from '../../../../common/render'
import EditGameExperience from './edit';

export default class Experience extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  render() {
    return(
      <div id="profile-game-experience">
        
      </div>
    );
  }
}

