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
  async terms_of_use({ response, request, view }) {
    return view.render('pages/legal/terms_of_use')
  }
  async privacy_policy({ response, request, view }) {
    return view.render('pages/legal/privacy_policy')
  }
  async gamers_code({ response, request, view }) {
    return view.render('pages/legal/gamers_code')
  }
}

module.exports = PageController
