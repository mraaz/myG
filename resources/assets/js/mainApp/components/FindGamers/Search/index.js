import React from 'react';
import debounce from 'lodash.debounce';
import ToggleButton from 'react-toggle-button'
import Filter from '../Filter';
import Results from '../Results';
import { showMessengerAlert } from '../../../../common/alert'
import { ignoreFunctions } from '../../../../common/render'

export default class Search extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    search: '',
    filter: '',
    from: 0,
    online: false,
  }

  componentDidMount() {
    this.props.onSearch('', this.state.online, this.state.from);
  }

  showHelp = () => showMessengerAlert(`
    You can use this to search for gamers, try typing a country or a game you're interested in.
    
    You can also target the search for a specific area you want, which will restrict your results to it,
    For example, if you want either Australians or Dota player, you can search for "Australia Dota",
    But if you want only Australians that play Dota, you can search for "country: Australia game: Dota".

    These are the areas that can be targeted:
    alias: ?, country: ?, relationship: ?, commendations: ?, team: ?, languages: ?, game: ?
  `);


  onSearch = debounce(() => {
    const search = this.state.search.trim();
    const filter = this.state.filter.trim();
    if (search.length < 3 && !filter) return this.props.onSearch('', this.state.online, this.state.from);
    return this.props.onSearch(search + ' ' + filter, this.state.online, this.state.from);
  }, 300)

  showMore = debounce(() => {
    if (this.props.gamers.length >= this.props.total || this.props.loading) return;
    this.setState(previous => ({ from: previous.from + 10 }), this.onSearch);
  }, 300)

  onChange = (search) => {
    this.setState({ search, from: 0 }, this.onSearch);
    if (search === ':?') this.showHelp();
  }

  onFilter = (filter) => {
    this.setState({ filter, from: 0 }, this.onSearch);
  }

  toggleOnline = () => {
    this.setState((previous) => ({ online: !previous.online }), this.onSearch);
  }

  helpButton = () => {
    return <span className="help clickable" onClick={this.showHelp}>!</span>
  }

  render() {
    return(
      <React.Fragment>
        <div id="find-gamers-search" className='row'>
          <div className='input-container'>
            <input 
              className='input search-gamers-input'
              placeholder='Search Gamers'
              value={this.state.search} 
              onChange={(event) => this.onChange(event.target.value)}
            ></input>
            {this.helpButton()}
          </div>
        </div>
        <div id='find-gamers-online' className='row'>
          <div className='hint'>Show only online Gamers</div>
          <ToggleButton
            value={this.state.online}
            onToggle={this.toggleOnline}
          />
        </div>
        <Filter onFilter={this.onFilter} />
        <Results showMore={this.showMore} gamers={this.props.gamers} total={this.props.total} loading={this.props.loading} profile={this.props.profile} sendFriendRequest={this.props.sendFriendRequest} cancelFriendRequest={this.props.cancelFriendRequest} follow={this.props.follow} unfollow={this.props.unfollow}/>
      </React.Fragment>
    );
  }
}
