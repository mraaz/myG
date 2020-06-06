import isFunction from 'lodash.isfunction'

export function ignoreFunctions(nextProps, nextState, currentProps, currentState) {
  if (!nextProps) nextProps = {}
  if (!nextState) nextState = {}
  if (!currentProps) currentProps = {}
  if (!currentState) currentState = {}
  for (const key of Object.keys(nextProps)) {
    if (isFunction(nextProps[key])) continue
    if (key.endsWith('Ref')) continue
    if (JSON.stringify(nextProps[key]) !== JSON.stringify(currentProps[key])) return true
  }
  for (const key of Object.keys(nextState)) {
    if (nextState[key] !== currentState[key]) return true
  }
  return false
}
