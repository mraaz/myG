'use strict'

class PageController {
  async home({ response, request, view, auth }) {
    if (auth.user) {
      return view.render('pages/react')
    } else {
      return view.render('pages/welcome')
    }
  }
  async redirectHome({ response, request, view, auth }) {
    return response.redirect('/')
  }
  async welcome({ response, request, view }) {
    return view.render('pages/welcome')
  }
}

module.exports = PageController
