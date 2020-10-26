import React from 'react';
import get from 'lodash.get'
import { connect } from 'react-redux'
import { ignoreFunctions } from '../../../../common/render'
import { searchGamersAction } from '../../../../redux/actions/searchAction'
import { fetchProfileInfoAction } from '../../../../redux/actions/profileAction'
import Banner from '../Banner';
import Search from '../Search';
import Results from '../Results';
import GamerSuggestions from '../../Profile/GamerSuggestions';

export class FindGamers extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    tab: 'Search'
  }

  componentDidMount() {
    document.title = 'myG - Find Gamers'
    if (!Object.keys(this.props.profile).length) this.props.fetchProfileInfo(this.props.alias);
  }

  renderHeaders = () => {
    return(
      <div className='headers'>
        <div className={`header clickable ${this.state.tab === 'Search' && 'selected'}`} onClick={() => this.setState({ tab: 'Search' })}>Search</div>
        <div className={`header clickable ${this.state.tab === 'Suggestions' && 'selected'}`} onClick={() => this.setState({ tab: 'Suggestions' })}>Suggestions</div>
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
        {this.state.tab === 'Search' && <Search onSearch={this.props.searchGamers} />}
        {this.state.tab === 'Search' && <Results gamers={this.props.gamers} loading={this.props.loading} />}
        {this.state.tab === 'Suggestions' && <GamerSuggestions noTitle />}
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
    searchGamers: (input) => dispatch(searchGamersAction(input)),
    fetchProfileInfo: (alias) => dispatch(fetchProfileInfoAction(alias))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindGamers)
