import React from 'react'
import { connect } from 'react-redux'
import { fetchOnlineUsersAction } from '../../../redux/actions/userAction'
import { getAssetUrl } from '../../../common/assets'
import { ignoreFunctions } from '../../../common/render'
import { logToElasticsearch } from '../../../integration/http/logger'

const colors = ['#425156', '#2D363A']

export class OnlineUsers extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    expanded: ['Active Now'],
  }

  componentDidMount() {
    this.props.fetchOnlineUsers()
  }

  renderHeader = ({ name, icon, color, fixed }) => {
    if (name === 'Active Now' && !fixed) return null;
    const expanded = this.state.expanded.includes(name)
    const chevronType = expanded ? 'down' : 'right'
    return (
      <div
        className='messenger-body-section-header clickable'
        style={{ backgroundColor: color }}
        onClick={() =>
          this.setState((previous) => ({
            expanded: previous.expanded.includes(name)
              ? [...previous.expanded.filter((game) => game !== name)]
              : [...previous.expanded, name],
          }))
        }>
        <div className='messenger-body-game-section' style={{ backgroundColor: color }}>
          <div className='messenger-game-icon' style={{ backgroundImage: `url('${icon}')` }} />
          <p className='messenger-body-section-header-name'>{name}</p>
        </div>
        <div className='messenger-body-section-header-info'>
          <div
            className='messenger-body-section-header-icon'
            style={{ backgroundImage: `url('${getAssetUrl(`ic_messenger_chevron_${chevronType}`)}')` }}
          />
        </div>
      </div>
    )
  }

  renderGame = ({ game: name, icon, gamers }, index) => {
    const color = index % 2 ? colors[0] : colors[1]
    const expanded = this.state.expanded.includes(name)
    return (
      <div key={name} className='messenger-body-section' style={{ backgroundColor: color }}>
        {this.renderHeader({ name, icon, color })}
        {expanded && (
          <div className='gamers'>
            {gamers.map((gamer) => (
              <div key={gamer} className='gamer clickable' onClick={() => window.router.push(`/profile/${gamer}`)}>
                {gamer}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  renderOnlineUsersButton = () => (
    <div
      className='online-users-button clickable'
      style={{ backgroundImage: `url(https://myg.gg/platform_images/Dashboard/Vko.svg)` }}
      onClick={this.props.onClose}
    />
  )

  renderOnlineUsers = () => {
    try {
      return (this.props.onlineUsers || []).map(this.renderGame);
    } catch(error) {
      logToElasticsearch('error', 'Online Users Error', { onlineUsers: this.props.onlineUsers, error: error && error.message || error });
      return <span>No online users at the moment</span>
    }
  }

  render() {
    const style = this.props.modal ? 'online-users-mobile' : 'online-users-desktop'
    return (
      <div
        className={`messenger-body-section ${style}`}
        style={{
          width: '20%',
          height: this.props.page ? '100%' : '400px',
        }}>
        {!!this.props.modal && this.renderOnlineUsersButton()}
        {this.renderHeader({ name: 'Active Now', color: '#425156', fixed: true })}
        <div style={{ overflowY: 'scroll' }}>
          {this.renderOnlineUsers()}
        </div>
      </div>
    )
  }
}

export function mapStateToProps(state) {
  const alias = state.user.alias
  const onlineUsers = Array.isArray(state.user.onlineUsers) ? state.user.onlineUsers : [];
  return { alias, onlineUsers }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchOnlineUsers: () => dispatch(fetchOnlineUsersAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlineUsers)
