import React from 'react'
import { connect } from 'react-redux'
import { fetchOnlineUsersAction } from '../../../redux/actions/userAction'
import { getAssetUrl } from '../../../common/assets'
import { ignoreFunctions } from '../../../common/render'

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

  renderGame = ({ game: name, icon, gamers }, index) => {
    const color = (index % 2) ? colors[0] : colors[1]
    const expanded = this.state.expanded.includes(name)
    const chevronType = expanded ? 'down' : 'right'
    return (
      <div key={name} className='messenger-body-section' style={{ backgroundColor: color }}>
        <div
          className='messenger-body-section-header clickable'
          style={{ backgroundColor: color }}
          onClick={() =>
            this.setState(
              (previous) => ({
                expanded: previous.expanded.includes(name)
                  ? [...previous.expanded.filter((game) => game !== name)]
                  : [...previous.expanded, name],
              })
            )
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
        {expanded && (
          <div className="gamers">
            {gamers.map((gamer) => 
              <div className="gamer clickable" onClick={() => window.router.push(`/profile/${gamer}`)}>
                {gamer}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  render() {
    return(
      <div className='messenger-body-section' style={{ 
        width: '20%',
        height: this.props.page ? '100%' : '400px',
        overflowY: 'scroll',
      }}>
        {this.props.onlineUsers.map(this.renderGame)}
      </div>
    );
  }
}

export function mapStateToProps(state) {
  const alias = state.user.alias
  const onlineUsers = state.user.onlineUsers || []
  return { alias, onlineUsers }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchOnlineUsers: () => dispatch(fetchOnlineUsersAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlineUsers)
