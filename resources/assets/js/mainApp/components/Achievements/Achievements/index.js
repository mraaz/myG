import React from 'react';
import get from 'lodash.get';
import { FormattedMessage, injectIntl } from 'react-intl'
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
    selected: '',
  }

  componentDidMount() {
    document.title = 'myG - Achievements'
  }

  selectTab = (tab) => {
    this.setState({ selected: tab });
    window.history.pushState({}, 'myG - Achievements', `/achievements/${tab}`);
  }

  renderHeaders = () => {
    const selected = this.state.selected || get(this.props, 'routeProps.match.params.route') || 'badges';
    return(
      <div className='headers'>
        <div className={`header clickable ${selected === 'badges' && 'selected'}`} onClick={() => this.selectTab('badges')}><FormattedMessage id='achievements.headers.Badges' defaultMessage='Badges' /></div>
        <div className={`header clickable ${selected === 'daily' && 'selected'}`} onClick={() => this.selectTab('daily')}><FormattedMessage id='achievements.headers.Daily' defaultMessage='Daily' /></div>
        <div className={`header clickable ${selected === 'weekly' && 'selected'}`} onClick={() => this.selectTab('weekly')}><FormattedMessage id='achievements.headers.Weekly' defaultMessage='Weekly' /></div>
        <div className={`header clickable ${selected === 'monthly' && 'selected'}`} onClick={() => this.selectTab('monthly')}><FormattedMessage id='achievements.headers.Monthly' defaultMessage='Monthly' /></div>
      </div>
    );
  }

  render() {
    const selected = this.state.selected || get(this.props, 'routeProps.match.params.route') || 'badges';
    return(
      <div id="profile">
        <Banner onlyProfile profile={this.props.profile} updateProfile={this.props.updateProfile} />
        <div id="achievements">
          {this.renderHeaders()}
          {selected === 'badges' && <Badges {...this.props} />}
          {selected === 'daily' && <Daily {...this.props} />}
          {selected === 'weekly' && <Weekly {...this.props} />}
          {selected === 'monthly' && <Monthly {...this.props} />}
        </div>
      </div>
    );
  }
}

export default injectIntl(Achievements)

