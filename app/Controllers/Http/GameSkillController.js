'use strict'

const GameSkills = use('App/Models/GameSkill')
const Database = use('Database')
const LoggingRepository = require('../../Repositories/Logging')

class GameSkillController {
  async store({ auth }, content) {
    if (auth.user) {
      if (content.trim().length > 88) return
      try {
        const newGameSkill = await GameSkills.create({
          content: content.trim(),
          user_id: auth.user.id,
        })
        return newGameSkill.id
      } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
          const newGameSkill = await Database.table('game_skills').where({ content: content.trim() }).first()
          return newGameSkill.id
        }
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    }
  }

  async getGameSkills({ request }) {
    try {
      const allSkills = await Database.table('game_skills')
        .where('content', 'like', '%' + request.input('content') + '%')
        .limit(88)
      return { allSkills }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async getTopGameSkills() {
    try {
      const allSkills = await Database.table('game_skills').orderBy('counter', 'desc').limit(18)
      return { allSkills }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }
}

module.exports = GameSkillController
