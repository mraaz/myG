import React from 'react'
import { ignoreFunctions } from '../../../../common/render'

export default class DossierSocialHub extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  render() {
    return <div className='content'>Social Hub --- TBD</div>
  }
}
