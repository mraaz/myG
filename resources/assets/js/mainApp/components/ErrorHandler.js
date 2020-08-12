import React from 'react'
import { GoogleAnalytics } from '../../common/analytics'
import { store } from '../../redux/Store'

export default class ErrorHandler extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    GoogleAnalytics.caughtReactError({ error, errorInfo })
    console.error(error, errorInfo)
    store.dispatch({ type: 'REACT_ERROR' })
    const hasReloadedOnError = window.localStorage.getItem('hasReloadedOnError', 0)
    if (Date.now() - hasReloadedOnError > 5000) {
      window.localStorage.setItem('hasReloadedOnError', Date.now())
      window.location.reload(true)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-container'>
          <h1 className='error-title'>Something went wrong :(</h1>
          <h2 className='error-subtitle'>Please try again later</h2>
        </div>
      )
    }

    return this.props.children
  }
}
