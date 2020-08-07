import React from 'react'
import Rox from 'rox-browser'

// Do we even care to protect this key? It's a free account afterall...
const secretRolloutKey = '5f27277a8427506a57cba720'

export const REPEAT_SCHEDULE = 'REPEAT_SCHEDULE'

const flags = {
  REPEAT_SCHEDULE: new Rox.Flag(),
}

async function initRollout() {
  const options = {}
  Rox.register('', flags)
  await Rox.setup(secretRolloutKey, options)
}

initRollout().then(function() {})

export class FeatureEnabled extends React.Component {
  render() {
    if ((this.props.anyOf || []).some((flag) => flags[`${flag}`].isEnabled())) return this.props.children
    if ((this.props.allOf || []).every((flag) => flags[`${flag}`].isEnabled())) return this.props.children
    return null
  }
}

export class FeatureDisabled extends React.Component {
  render() {
    if ((this.props.anyOf || []).some((flag) => flags[`${flag}`].isEnabled())) return null
    return this.props.children
  }
}
