const Database = use('Database')
const { nanoid } = require('nanoid')
class ShortLinksController {
  generateCode() {
    return nanoid(6)
  }

  async fetchUniqueCode() {
    let attempts = 0
    while (attempts < 5) {
      ++attempts
      const code = this.generateCode()
      const response = await Database.from('short_links').where({ code }).first()
      if (!response) return code
    }
    throw new Error('Unable to generate unique code - max attempts exceeded')
  }

  async fetchLink({ request }) {
    const { code } = request.only(['code'])
    const response = await Database.from('short_links').where({ code }).first()
    if (response) return { link: response.link }
    return { link: null }
  }

  async createShortLink({ request }) {
    const { link } = request.only(['link'])
    const response = await Database.from('short_links').where({ link }).first()
    if (response) return { code: response.code }
    const code = await this.fetchUniqueCode()
    await Database.table('short_links').insert({ link, code })
    return { code }
  }
}

module.exports = ShortLinksController
