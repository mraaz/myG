import React, { Component, Fragment } from 'react'

class MobileMenu extends Component {
  render() {
    return (
      <Fragment>
        <section className='main-mobile-menu'>
          <p>This is Mobile Menu</p>
        </section>
      </Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
  }
}

export default MobileMenu
