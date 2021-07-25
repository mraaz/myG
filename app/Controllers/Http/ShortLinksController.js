
const Database = use('Database')

const CODE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

class ShortLinksController {

  generateCharacter() {
    return CODE_CHARACTERS.charAt(Math.floor(Math.random() * CODE_CHARACTERS.length));
  }

  generateCode() {
    let code = "";
    for (let index = 0; index < 6; ++index) code += this.generateCharacter();
    return code;
  }

  async fetchUniqueCode() {
    let attempts = 0;
    while (attempts < 5) {
      ++attempts;
      const code = this.generateCode();
      const response = await Database.from("short_links").where({ code }).first();
      if (!response) return code;
    }
    throw new Error("Unable to generate unique code - max attempts exceeded");
  }

  async fetchLink({ request }) {
    const { code } = request.only(['code']);
    const response = await Database.from("short_links").where({ code }).first();
    if (response) return { link: response.link };
    return { link: null };
  }

  async createShortLink({ request }) {
    const { link } = request.only(['link']);
    const response = await Database.from("short_links").where({ link }).first();
    if (response) return { code: response.code };
    const code = await this.fetchUniqueCode();
    await Database.table("short_links").insert({ link, code });
    return { code };
  }

}

module.exports = ShortLinksController
