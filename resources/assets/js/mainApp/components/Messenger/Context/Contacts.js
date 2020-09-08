import React from 'react'
import Divider from './Divider'
import Section from './Section'
import { STATUS_ENUM } from '../../../../common/status'
import logger from '../../../../common/logger'
import { ignoreFunctions } from '../../../../common/render'

export default class Contacts extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    sectionExpanded: {
      [STATUS_ENUM.ONLINE]: true,
      [STATUS_ENUM.PLAYING]: false,
      [STATUS_ENUM.AFK]: false,
      [STATUS_ENUM.OFFLINE]: false,
    },
  }

  expandSection = (section) => {
    this.setState((previous) => ({
      sectionExpanded: {
        ...{
          [STATUS_ENUM.ONLINE]: false,
          [STATUS_ENUM.PLAYING]: false,
          [STATUS_ENUM.AFK]: false,
          [STATUS_ENUM.OFFLINE]: false,
        },
        [section]: !previous.sectionExpanded[section],
      },
    }))
  }

  render() {
    logger.log('RENDER', 'Contacts')
    return Divider(
      'friends',
      this.props.expanded,
      () => this.props.onExpand(this.props.expanded),
      () => {
        return (
          <div className='messenger-body-section'>
            {!this.props.search && (
              <React.Fragment>
                <Section
                  {...this.props}
                  status={STATUS_ENUM.ONLINE}
                  count={this.props.contactCount ? this.props.contactCount[STATUS_ENUM.ONLINE] : 0}
                  expanded={this.state.sectionExpanded[STATUS_ENUM.ONLINE]}
                  onSectionExpanded={() => this.expandSection(STATUS_ENUM.ONLINE)}
                />
                <Section
                  {...this.props}
                  status={STATUS_ENUM.PLAYING}
                  count={this.props.contactCount ? this.props.contactCount[STATUS_ENUM.PLAYING] : 0}
                  expanded={this.state.sectionExpanded[STATUS_ENUM.PLAYING]}
                  onSectionExpanded={() => this.expandSection(STATUS_ENUM.PLAYING)}
                />
                <Section
                  {...this.props}
                  status={STATUS_ENUM.AFK}
                  count={this.props.contactCount ? this.props.contactCount[STATUS_ENUM.AFK] : 0}
                  expanded={this.state.sectionExpanded[STATUS_ENUM.AFK]}
                  onSectionExpanded={() => this.expandSection(STATUS_ENUM.AFK)}
                />
                <Section
                  {...this.props}
                  status={STATUS_ENUM.OFFLINE}
                  count={this.props.contactCount ? this.props.contactCount[STATUS_ENUM.OFFLINE] : 0}
                  expanded={this.state.sectionExpanded[STATUS_ENUM.OFFLINE]}
                  onSectionExpanded={() => this.expandSection(STATUS_ENUM.OFFLINE)}
                />
              </React.Fragment>
            )}
          </div>
        )
      }
    )
  }
}
