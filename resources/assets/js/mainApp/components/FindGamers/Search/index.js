import React from 'react';
import ToggleButton from 'react-toggle-button'
import { showMessengerAlert } from '../../../../common/alert'
import { ignoreFunctions } from '../../../../common/render'

export default class Search extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    search: '',
    online: false,
  }

  componentDidMount() {
    this.props.onSearch('', this.state.online);
  }

  showHelp = () => showMessengerAlert(`
    You can use this to search for gamers, try typing a country or a game you're interested in.
    
    You can also target the search for a specific area you want, which will restrict your results to it,
    For example, if you want either Australians or Dota player, you can search for "Australia Dota",
    But if you want only Australians that play Dota, you can search for "country: Australia game: Dota".

    These are the areas that can be targeted:
    alias: ?, country: ?, relationship: ?, commendations: ?, team: ?, languages: ?, game: ?
  `);

  onChange = ({ target: { value: search } }) => {
    this.setState({ search });
    if (search === ':?') this.showHelp();
    if (search.trim().length >= 3) this.props.onSearch(search.trim(), this.state.online);
    if (search.trim().length < 3) this.props.onSearch('', this.state.online);
  }

  toggleOnline = () => {
    this.setState((previous) => ({ online: !previous.online }), () => {
      this.props.onSearch(this.state.search.trim(), this.state.online);
    });
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
              className='input'
              placeholder='Search Gamers'
              value={this.state.search} 
              onChange={this.onChange}
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
      </React.Fragment>
    );
  }
}
