import React, { Component } from 'react'

import TopTabs from './TopTabs'

export default class Alerts extends Component {
  constructor() {
    super()
  }

  componentDidMount = () => {
    window.scrollTo(0, 0)
  }

  render() {
    const { active } = this.props;

    const isActive = active == true ? {display: 'block'} : {display: 'none'};

    return (
      <div style={isActive}>
        <TopTabs tabs={['All', 'Feed', 'Games', 'Misc']} />
        <div className='top-actions'>
          <div className='actions'>
            <button className='action'>Mark All Read</button>
            <button className='action'>Clear All</button>
          </div>
        </div>
        <div className='notification alert'>
          <div className='notification-user-avatar'></div>
          <div className='notification-content'>
            <p className='notification-description'>
              <span className='notification-username'>@brunogoodma</span> 
              has <span className='notification-type'>Commented</span> 
              your <span className='notification-link'>Post</span>
            </p>
            <div className='notification-options'>
              <span className='notification-time'>45 minutes ago</span>
            </div>
          </div>
        </div>
        <div className='endline'>
          No more updates
        </div>
      </div>
    );
  }
}