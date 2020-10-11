import React from 'react';
import { ignoreFunctions } from '../../../../common/render'

export default class Search extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    search: '',
  }

  onChange = ({ target: { value: search } }) => {
    this.setState({ search });
    if (search.length >= 3) this.props.onSearch(search);
  }

  render() {
    return(
      <div id="find-gamers-search" className='row'>
        <div className='input-container'>
          <input 
            className='input'
            placeholder='Search Gamers'
            value={this.state.search} 
            onChange={this.onChange}
          ></input>
        </div>
      </div>
    );
  }
}
