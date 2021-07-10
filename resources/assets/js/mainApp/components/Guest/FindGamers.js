import React from 'react'
import { connect } from 'react-redux';
import { getAssetUrl } from '../../../common/assets'
import { ignoreFunctions } from '../../../common/render'
import { searchGamersAction } from '../../../redux/actions/searchAction'
import Search from '../FindGamers/Search';
import GuestBanner from './Banner';

class GuestFindGamers extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  render() {
    return (
      <div id='find-gamers' className="guest-page" style={{ backgroundImage: `url(${getAssetUrl('background_guest')})` }}>
        <GuestBanner hideSearchGamers />
        <div id="guest-content">
          <Search {...this.props} guest onSearch={this.props.searchGamers} />
        </div>
      </div >
    )
  }
}

function mapStateToProps(state) {
  return {
    gamers: state.search.gamers || [],
    total: state.search.total || 0,
    loading: state.search.gamersLoading,
    error: state.search.gamersError,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchGamers: (input, online, from) => dispatch(searchGamersAction(input, online, from)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestFindGamers)
