import React from 'react'
import Rox from 'rox-browser'

// Do we even care to protect this key? It's a free account afterall...
const secretRolloutKey = '5f27277a8427506a57cba720'

export const REPEAT_SCHEDULE = 'REPEAT_SCHEDULE'
export const PROFILE_V2 = 'PROFILE_V2'
export const CHANNEL = 'CHANNEL'
export const TEAMS = 'TEAMS'
export const DRAFT_JS = 'DRAFT_JS'

const flags = {
  REPEAT_SCHEDULE: new Rox.Flag(),
  PROFILE_V2: new Rox.Flag(),
  CHANNEL: new Rox.Flag(),
  TEAMS: new Rox.Flag(),
  DRAFT_JS: new Rox.Flag()
}

async function initRollout() {
  const options = {}
  Rox.register('', flags)
  await Rox.setup(secretRolloutKey, options)
}

initRollout().then(function () {})

export function checkFlag(flag) {
  const isLocalhost = window.location.href.startsWith('http://localhost')
  const isNgrok = window.location.href.includes('ngrok')
  if (isLocalhost || isNgrok) return isFlagEnabledDevelopment(flag)
  return isFlagEnabledProduction(flag)
}

function isFlagEnabledProduction(flag) {
  return flags[`${flag}`].isEnabled()
}

function isFlagEnabledDevelopment(flag) {
  return window.FEATURES_ON && window.FEATURES_ON.includes(flag)
}

export class FeatureEnabled extends React.Component {
  render() {
    if ((this.props.anyOf || []).some(checkFlag)) return this.props.children
    if ((this.props.allOf || []).every(checkFlag)) return this.props.children
    return null
  }
}

export class FeatureDisabled extends React.Component {
  render() {
    if ((this.props.anyOf || []).some(checkFlag)) return null
    return this.props.children
  }
}
