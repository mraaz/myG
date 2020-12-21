import React from 'react';
import get from 'lodash.get'
import { connect } from 'react-redux'
import { ignoreFunctions } from '../../../../common/render'
import { searchGamersAction } from '../../../../redux/actions/searchAction'
import { fetchProfileInfoAction, sendFriendRequestAction, cancelFriendRequestAction, followAction, unfollowAction } from '../../../../redux/actions/profileAction'
import Banner from '../Banner';
import Search from '../Search';
import Results from '../Results';
import GamerSuggestions from '../../Profile/GamerSuggestions';

export class FindGamers extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    tab: '',
  }

  isInSearch = () => {
    return this.state.tab ? this.state.tab === 'search' : this.props.tab === 'search';
  }

  isInSuggestions = () => {
    return this.state.tab ? this.state.tab === 'suggestions' : this.props.tab === 'suggestions';
  }

  componentDidMount() {
    document.title = 'myG - Find Gamers'
    if (!Object.keys(this.props.profile).length) this.props.fetchProfileInfo(this.props.alias);
  }

  renderHeaders = () => {
    return(
      <div className='headers'>
        <div 
          className={`header clickable ${this.isInSearch() && 'selected'}`}
          onClick={() => {
            window.history.pushState({}, 'myG - Find Gamers', '/find-gamers/search')
            this.setState({ tab: 'search' })
          }}
        >
          Search
      </div>
        <div 
          className={`header clickable ${this.isInSuggestions() && 'selected'}`}
          onClick={() => {
            window.history.pushState({}, 'myG - Find Gamers', '/find-gamers/suggestions')
            this.setState({ tab: 'suggestions' })
          }}
        >
          Suggestions
      </div>
      </div>
    );
  }

  render() {
    const TopBar = () => <div className="top-bar">Find Gamers</div>;
    const Headers = () => this.renderHeaders();
    return(
      <div id="find-gamers">
        <TopBar />
        <Banner profile={this.props.profile} />
        <Headers />
        {this.isInSearch() && <Search onSearch={this.props.searchGamers} />}
        {this.isInSearch() && <Results gamers={this.props.gamers} loading={this.props.loading} profile={this.props.profile} sendFriendRequest={this.props.sendFriendRequest} cancelFriendRequest={this.props.cancelFriendRequest} follow={this.props.follow} unfollow={this.props.unfollow}/>}
        {this.isInSuggestions() && <GamerSuggestions noTitle gamers={this.props.gamers} loading={this.props.loading} profile={this.props.profile} sendFriendRequest={this.props.sendFriendRequest} cancelFriendRequest={this.props.cancelFriendRequest} follow={this.props.follow} unfollow={this.props.unfollow} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { userId, alias } = state.user;
  const profile = get(state, `profile.profiles[${alias}]`, {});
  return {
    userId,
    alias,
    profile,
    gamers: state.search.gamers,
    loading: state.search.gamersLoading,
    error: state.search.gamersError,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchGamers: (input, online) => dispatch(searchGamersAction(input, online)),
    fetchProfileInfo: (alias) => dispatch(fetchProfileInfoAction(alias)),
    sendFriendRequest: (alias, id) => dispatch(sendFriendRequestAction(alias, id)),
    cancelFriendRequest: (alias, id) => dispatch(cancelFriendRequestAction(alias, id)),
    follow: (alias, id) => dispatch(followAction(alias, id)),
    unfollow: (alias, id) => dispatch(unfollowAction(alias, id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindGamers)
