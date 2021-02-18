import React from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { ignoreFunctions } from '../../../../common/render'
import { fetchStatsAction } from '../../../../redux/actions/userAction'
import { fetchProfileInfoAction, updateProfileInfoAction } from '../../../../redux/actions/profileAction';
import Achievements from '../Achievements';

class AchievementsContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    loading: false,
    loaded: false,
  }

  componentDidMount() {
    this.loadProfileStats();
  }

  componentDidUpdate() {
    this.loadProfileStats();
  }

  loadProfileStats = () => {
    if (!this.props.alias || this.state.loading || this.state.loaded) return;
    this.setState({ loading: true, loaded: false });
    const finish = () => this.setState({ loading: false, loaded: true });
    const profile = this.props.fetchProfile(this.props.alias);
    const stats = this.props.fetchStats(this.props.alias);
    Promise.all([profile, stats]).then(finish);
  }

  render() {
    const { alias, stats, profile } = this.props;
    if (!this.state.loaded) return null;
    return <Achievements 
      {...this.props}
      alias={alias}
      profile={profile}
      stats={stats}
      updateProfile={this.props.updateProfile}
    />;
  }
}

function mapStateToProps(state) {
  return { 
    alias: state.user.alias || null,
    stats: state.user.userTransactionStates || {} || {},
    profile: get(state, `profile.profiles[${state.user.alias}]`, {}),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchStats: (alias) => dispatch(fetchStatsAction(alias)),
    fetchProfile: (alias) => dispatch(fetchProfileInfoAction(alias)),
    updateProfile: (alias, updates) => dispatch(updateProfileInfoAction(alias, updates)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AchievementsContainer)

