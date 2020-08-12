import React from 'react'
import { GoogleAnalytics } from '../../common/analytics'
import { store } from '../../redux/Store'
import { logToElasticsearch } from '../../integration/http/logger'

const originalErrorHandler = console.error
const originalWindowErrorHandler = window.onerror
const originalWindowExceptionHandler = window.onunhandledrejection

export default class ErrorHandler extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidMount() {
    console.error = this.handleError
    window.onerror = this.handleError
    window.onunhandledrejection = this.handleError
  }

  componentWillUnmount() {
    console.error = originalErrorHandler
    window.onerror = originalWindowErrorHandler
    window.onunhandledrejection = originalWindowExceptionHandler
  }

  componentDidCatch(error) {
    this.handleError(error, "SHOULD_RELOAD")
  }

  handleError = (error, reload = false) => {
    originalErrorHandler(error)

    const stack = (error && error.stack && error.stack.split('at ')[1]) || null
    const message = (error && error.message) || 'Unknown'
    const context = (stack && stack.split('(')[0]) || 'Unknown'
    if (message !== 'Unknown' || context !== 'Unknown') {
      GoogleAnalytics.caughtReactError({ message, context })
      logToElasticsearch('error', context, message)
    }

    if (reload === "SHOULD_RELOAD") {
      store.dispatch({ type: 'REACT_ERROR' })
      const hasReloadedOnError = window.localStorage.getItem('hasReloadedOnError', 0)
      if (Date.now() - hasReloadedOnError > 5000) {
        window.localStorage.setItem('hasReloadedOnError', Date.now())
        window.location.reload(true)
      }
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
