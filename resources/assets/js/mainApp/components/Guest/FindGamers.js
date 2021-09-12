import React from 'react'
import { connect } from 'react-redux'
import { ignoreFunctions } from '../../../common/render'
import { searchGamersAction } from '../../../redux/actions/searchAction'
import Search from '../FindGamers/Search'
import GuestBanner from './Banner'
import SignUpModal from './SignUpModal'

class GuestFindGamers extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }
  state = {
    showModal: false
  }

  handleGuestModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    return (
      <div id='find-gamers' className='guest-page' style={{ backgroundColor: '#000' }}>
        <GuestBanner handleGuestModal={this.handleGuestModal} />
        {this.state.showModal && (
          <SignUpModal handleGuestModal={this.handleGuestModal} onClick={() => this.setState({ showModal: false })} />
        )}

        <div id='guest-content'>
          <Search {...this.props} guest onSearch={this.props.searchGamers} handleGuestModal={this.handleGuestModal} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    gamers: state.search.gamers || [],
    total: state.search.total || 0,
    loading: state.search.gamersLoading,
    error: state.search.gamersError
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchGamers: (input, online, from) => dispatch(searchGamersAction(input, online, from))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestFindGamers)
