import React from 'react';
import get from 'lodash.get';
import { ignoreFunctions } from '../../../../common/render'
import FindGamers from '../FindGamers';

export default class FindGamersContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  static getDerivedStateFromProps(props) {
    const alias = get(props, 'initialData.userInfo.alias', '');
    const isLoadingInitialData = get(props, 'initialData') === undefined;
    return {
      alias,
      isLoadingInitialData,
    };
  }

  render() {
    const { alias, isLoadingInitialData } = this.state;
    if (isLoadingInitialData || !alias) return null;
    return <FindGamers 
      alias={alias}
      initialData={this.props.initialData}
    />;
  }
}

