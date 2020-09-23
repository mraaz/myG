import React from 'react';
import { Redirect } from 'react-router'
import get from 'lodash.get';
import { ignoreFunctions } from '../../../../common/render'
import Profile from '../Profile';

export default class ProfileContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  static getDerivedStateFromProps(props) {
    const alias = get(props, 'routeProps.match.params.alias', '');
    const userAlias = get(props, 'initialData.userInfo.alias', '');
    const gameId = get(props, 'routeProps.match.params.gameId', '');
    const isLoadingInitialData = get(props, 'initialData') === undefined;
    return {
      alias,
      userAlias,
      gameId,
      isLoadingInitialData,
    };
  }

  render() {
    const { alias, userAlias, gameId, isLoadingInitialData } = this.state;
    if (isLoadingInitialData || !userAlias) return null;
    if (!alias) return <Redirect push to={`/profile/${userAlias}`} />;
    return <Profile 
      alias={alias}
      userAlias={userAlias}
      gameId={gameId}
      initialData={this.props.initialData}
    />;
  }
}

