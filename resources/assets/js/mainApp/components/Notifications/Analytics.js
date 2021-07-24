import React, { Component } from 'react'
import axios from 'axios'

import TopTabs from './TopTabs'
import NoRecord from './NoRecord'

export default class Analytics extends Component {
  constructor() {
    super()
    this.state = {
      analytics: false
    }
  }

  componentDidMount = async () => {
    document.title = 'myG - Notification'

    window.scrollTo(0, 0)
    const getAnalytics = await axios.get('/api/analytics/show')
    this.setState({ analytics: getAnalytics.data })
  }

  render() {
    const { active } = this.props
    const { analytics = false } = this.state

    const show = analytics ? true : false
    const isActive = active == true ? { display: 'block' } : { display: 'none' }

    return (
      <div style={isActive} className='game__Analytics'>
        <TopTabs tabs={['All']} changeTab={this.changeTab} />
        {!show && <NoRecord title='No more updates.' linkvisible={false} />}

        <div className='gameList__box' style={{ padding: '15px' }}>
          {show && (
            <div className='analytics'>
              <table>
                &nbsp;Active Users:
                <tr>
                  <th>
                    <div style={{ textAlign: 'center' }}> Daily</div>
                  </th>
                  <th>
                    <div style={{ textAlign: 'center' }}> Weekly</div>
                  </th>
                  <th>
                    <div style={{ textAlign: 'center' }}> Monthly</div>
                  </th>
                </tr>
                <tr>
                  <td>
                    <div style={{ textAlign: 'center' }}> {analytics.getDAU[0].no_of_Users}</div>{' '}
                  </td>{' '}
                  <td>
                    <div style={{ textAlign: 'center' }}> {analytics.getWAU[0].no_of_Users}</div>
                  </td>
                  <td>
                    <div style={{ textAlign: 'center' }}> {analytics.getMAU[0].no_of_Users}</div>
                  </td>
                </tr>
                &nbsp; Total Users:
                <tr>
                  <th>
                    <div style={{ textAlign: 'center' }}>myG total Users</div>
                  </th>
                  <th>
                    <div style={{ textAlign: 'center' }}>Total Users from: {analytics.fromDate}</div>
                  </th>
                </tr>
                <tr>
                  <td>
                    <div style={{ textAlign: 'center' }}> {analytics.getNumberUsers[0].no_of_Users}</div>{' '}
                  </td>{' '}
                  <td>
                    <div style={{ textAlign: 'center' }}> {analytics.getNumberUsersFromDate[0].no_of_Users}</div>
                  </td>
                </tr>
                &nbsp;Levels:
                <tr>
                  <th>
                    <div style={{ textAlign: 'center' }}>Lvl 2</div>
                  </th>
                  <th>
                    <div style={{ textAlign: 'center' }}>Lvl 3</div>
                  </th>
                  <th>
                    <div style={{ textAlign: 'center' }}>Lvl 4</div>
                  </th>
                  <th>
                    <div style={{ textAlign: 'center' }}>Lvl 5</div>
                  </th>
                </tr>
                <tr>
                  <td>
                    <div style={{ textAlign: 'center' }}> {analytics.getlvl2[0].no_of_Users}</div>{' '}
                  </td>{' '}
                  <td>
                    <div style={{ textAlign: 'center' }}> {analytics.getlvl3[0].no_of_Users}</div>
                  </td>
                  <td>
                    <div style={{ textAlign: 'center' }}> {analytics.getlvl4[0].no_of_Users}</div>
                  </td>
                  <td>
                    <div style={{ textAlign: 'center' }}> {analytics.getlvl5[0].no_of_Users}</div>
                  </td>
                </tr>
              </table>
            </div>
          )}
        </div>
      </div>
    )
  }
}
