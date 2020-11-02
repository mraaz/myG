import React from 'react';
import Home from '../Home';

export default class ChatLinkContainer extends React.Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    setTimeout(() => this.setState({ ready: true }), 1000);
  }

  render() {
    if (!this.state.ready) return null;
    return <Home {...this.props} />
  }
}