import isFunction from 'lodash.isfunction'
import logger from './logger'

export function ignoreFunctions(nextProps, nextState, currentProps, currentState) {
  if (!nextProps) nextProps = {}
  if (!nextState) nextState = {}
  if (!currentProps) currentProps = {}
  if (!currentState) currentState = {}
  for (const key of Object.keys(nextProps)) {
    if (isFunction(nextProps[key])) continue
    if (key.endsWith('Ref')) continue
    if (JSON.stringify(nextProps[key]) !== JSON.stringify(currentProps[key])) {
      logger.log('EXPLAIN', `returning true due to prop ${key} - ${JSON.stringify(currentProps[key])} -> ${JSON.stringify(nextProps[key])}`)
      return true
    }
  }
  for (const key of Object.keys(nextState)) {
    if (nextState[key] !== currentState[key]) {
      logger.log('EXPLAIN', `returning true due to state ${key} - ${JSON.stringify(currentState[key])} -> ${JSON.stringify(nextState[key])}`)
      return true
    }
  }
  return false
}
