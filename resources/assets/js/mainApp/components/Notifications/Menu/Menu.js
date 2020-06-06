import React, { Component } from 'react'
import Button from './Button';

export default class Menu extends Component {
  constructor() {
    super()

    this.state = {
      active: 0,
    }
  }

  changeTab = tab => {
    this.setState({
      active: tab,
    })
  }

  isActive = tab => {
    return this.state.active === tab
  }

  render() {
    const { changeContentTab } = this.props;

    return (
      <div className='notifications-menu'>
        <div className='button-list'>
          <Button 
            title='Upcoming Games'
            active={this.isActive(0)}
            onClick={() => { this.changeTab(0); changeContentTab(0) }} 
          />
          <Button
            title='Approvals'
            active={this.isActive(1)}
            onClick={() => { this.changeTab(1); changeContentTab(1) }}
          />
          <Button
            title='Alerts'
            active={this.isActive(2)}
            onClick={() => { this.changeTab(2); changeContentTab(2) }}
          />
          <Button
            title='Chat'
            active={this.isActive(3)}
            onClick={() => { this.changeTab(3); changeContentTab(3) }}
          />
          <Button
            title='Settings'
            active={this.isActive(4)}
            onClick={() => { this.changeTab(4); changeContentTab(4) }}
          />
        </div>
      </div>
    );
  }
}