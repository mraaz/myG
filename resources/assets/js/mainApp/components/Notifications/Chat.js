import React, { Component } from 'react'

import TopTabs from './TopTabs'

export default class Chat extends Component {
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
        <TopTabs tabs={['All', 'Messages', 'Groups', 'Misc']} />
        <div className='endline'>
          You don't have new notifications
        </div>
      </div>
    );
  }
}