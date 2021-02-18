import React from 'react';
import { ignoreFunctions } from '../../../../common/render'
import { getAssetUrl } from '../../../../common/assets';
import xpTable from './xp.json';
import levelBenefits from './levels.json';

export default class Help extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    selected: 'xp',
    expandedLevel: levelBenefits[0].value,
  }

  renderClose = () => {
    return (
      <div
        className='close-button clickable'
        style={{ backgroundImage: `url(${getAssetUrl('ic_profile_close')})` }}
        onClick={this.props.onClose}
      />
    )
  }

  renderHeaders = () => {
    return(
      <div className='headers'>
        <div className={`header clickable ${this.state.selected === 'xp' && 'selected'}`} onClick={() => this.setState({ selected: 'xp' })}>XP Table</div>
        <div className={`header clickable ${this.state.selected === 'benefits' && 'selected'}`} onClick={() => this.setState({ selected: 'benefits' })}>Level Benefits</div>
      </div>
    );
  }

  renderXpTable = () => {
    if (this.state.selected !== 'xp') return null;
    return(
      <div className="xp-table">
        {xpTable.map((entry, index) => (
          <div key={index} className="entry">
            <div className="criteria">{entry.criteria}</div>
            <div className="xp">Gets <span className="value">{entry.value}XP</span></div>
          </div>
        ))}
      </div>
    );
  }

  renderLevelBenefits = () => {
    if (this.state.selected !== 'benefits') return null;
    return(
      <div className="level-benefits">
        {levelBenefits.map((entry, index) => (
          <div key={index} className="entry">
            <div className="level clickable" onClick={() => this.setState({ expandedLevel: entry.value })}>
              Level {entry.value}
              <div className="icon" style={{ backgroundImage: `url(${getAssetUrl('ic_messenger_chevron_down')})` }}/>
            </div>
            {this.state.expandedLevel === entry.value && entry.benefits.map((benefit, index) => (
              <div key={index} className="benefit">{benefit}</div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  render() {
    return(
      <div id="help-modal">
        <div className="container">
          {this.renderClose()}
          {this.renderHeaders()}
          {this.renderXpTable()}
          {this.renderLevelBenefits()}
        </div>
      </div>
    );
  }
}

