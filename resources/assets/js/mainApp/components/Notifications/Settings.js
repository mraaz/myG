import React, { Component } from 'react'

export default class Settings extends Component {
  constructor() {
    super()
    this.state = {
      viaEmail: '',
    }
  }

  componentDidMount = () => {
    document.title = 'myG - Notification'

    window.scrollTo(0, 0)
  }
  handleNotifyViaEmailChange = (event, value) => {
    this.setState({
      viaEmail: value,
    })
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
        <div className='option via__email-container'>
          <div className='title'>Notify via E-mail</div>
          <div className='via__email'>
            <div>
              <label className='container'>
                Minimal
                <input
                  type='checkbox'
                  name='minimal'
                  checked={this.state.viaEmail == 'minimal'}
                  onChange={(e) => this.handleNotifyViaEmailChange(e, 'minimal')}
                  value={'minimal'}
                />
                <span className='checkmark'></span>
              </label>
            </div>
            <div>
              <label className='container'>
                Always
                <input
                  type='checkbox'
                  name='always'
                  checked={this.state.viaEmail == 'always'}
                  onChange={(e) => this.handleNotifyViaEmailChange(e, 'always')}
                  value={'always'}
                />
                <span className='checkmark'></span>
              </label>
            </div>
            <div>
              <label className='container'>
                Never
                <input
                  type='checkbox'
                  name='never'
                  checked={this.state.viaEmail == 'never'}
                  onChange={(e) => this.handleNotifyViaEmailChange(e, 'never')}
                  value={'never'}
                />
                <span className='checkmark'></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
