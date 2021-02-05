import React, { Component } from 'react'

export default class Settings extends Component {
  constructor() {
    super()
  }

  componentDidMount = () => {
    document.title = 'myG - Notification'

    window.scrollTo(0, 0)
  }

  render() {
    const { active } = this.props

    const isActive = active == true ? { display: 'block' } : { display: 'none' }

    return (
      <div className='settings' style={isActive}>
        <div className='option'>
          <div className='title'>Browser notifications</div>
          <div className='button__switch browser__notification'>
            <input type='checkbox' defaultChecked={true} id='switch-orange' onChange={() => {}} className='switch' />
          </div>
        </div>
        <div className='option'>
          <div className='title'>Sound notifications</div>
          <div className='button__switch sound__notification'>
            <input type='checkbox' defaultChecked={true} id='switch-orange' onChange={() => {}} className='switch' />
          </div>
        </div>
        <div className='option'>
          <div className='title'>Notify via E-mail</div>
        </div>
      </div>
    )
  }
}
