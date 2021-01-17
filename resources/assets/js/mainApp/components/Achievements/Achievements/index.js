import React from 'react';
import { connect } from 'react-redux';
import { ignoreFunctions } from '../../../../common/render'
import Banner from '../../Profile/Banner';
import Badges from '../Badges';
import Daily from '../Daily';
import Weekly from '../Weekly';
import Monthly from '../Monthly';

class Achievements extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    selected: 'badges',
  }

  renderHeaders = () => {
    return(
      <div className='headers'>
        <div className={`header clickable ${this.state.selected === 'badges' && 'selected'}`} onClick={() => this.setState({ selected: 'badges' })}>Badges</div>
        <div className={`header clickable ${this.state.selected === 'daily' && 'selected'}`} onClick={() => this.setState({ selected: 'daily' })}>Daily</div>
        <div className={`header clickable ${this.state.selected === 'weekly' && 'selected'}`} onClick={() => this.setState({ selected: 'weekly' })}>Weekly</div>
        <div className={`header clickable ${this.state.selected === 'monthly' && 'selected'}`} onClick={() => this.setState({ selected: 'monthly' })}>Monthly</div>
      </div>
    );
  }

  render() {
    return(
      <div id="profile">
        <Banner onlyProfile profile={this.props.profile} updateProfile={this.props.updateProfile} />
        <div id="achievements">
          {this.renderHeaders()}
          {this.state.selected === 'badges' && <Badges {...this.props} />}
          {this.state.selected === 'daily' && <Daily {...this.props} />}
          {this.state.selected === 'weekly' && <Weekly {...this.props} />}
          {this.state.selected === 'monthly' && <Monthly {...this.props} />}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Achievements)

