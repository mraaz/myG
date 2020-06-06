import React, { Component, Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import UpcomingItem from './UpcomingItem'

export default class Upcoming extends Component {
  constructor() {
    super()
  }

  render() {
    const { active } = this.props;

    const isActive = active == true ? {display: 'block'} : {display: 'none'};

    return (
      <div style={isActive}>
        <InfiniteScroll dataLength={5} hasMore={false} >
          <UpcomingItem gameTitle='Dota 2' players='3'/>
          <UpcomingItem gameTitle='MW3' players='4'/>
          <UpcomingItem gameTitle='Warfare' players='11'/>
          <UpcomingItem gameTitle='Bioshock' players='10'/>
          <UpcomingItem gameTitle='Free Fire' players='2'/>
        </InfiniteScroll>
      </div>
    );
  }
}