'use strict'

const Database = use('Database')
const EsportsExperience = use('App/Models/EsportsExperience')
const GameNameController = use('./GameNameController')

class EsportsExperienceController {
  async store({ auth, request, response }) {
    if (auth.user) {
      if (/['/.%#$;`\\]/.test(request.input('skills'))) {
        return false
      }
      try {
        const newEsportsExp = await EsportsExperience.create({
          user_id: auth.user.id,
          role_title: request.input('role_title'),
          game_name: request.input('game_name'),
          team_name: request.input('team_name'),
          duration: request.input('duration'),
          achievements: request.input('achievements'),
          skills: request.input('skills'),
        })
        let gameface = new GameNameController()

        const mygame = await Database.table('game_names').where({
          game_name: request.input('game_name'),
        })

        request.params.game_names_id = mygame[0].id
        gameface.incrementGameCounter({ auth, request, response })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    }
  }

  async show_exp({ auth, request, response }) {
    try {
      const myesportsExperience = await EsportsExperience.query()
        .where({ id: request.params.esportsExp_id })
        .fetch()
      return {
        myesportsExperience,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async update({ auth, request, response }) {
    if (auth.user) {
      if (/['/.%#$;`\\]/.test(request.input('skills'))) {
        return false
      }
      try {
        const game_experiences = await Database.table('esports_experiences').where({
          id: request.params.id,
        })

        if (game_experiences[0].game_name !== request.input('game_name')) {
          let gameface = new GameNameController()

          let mygame = await Database.table('game_names').where({
            game_name: game_experiences[0].game_name,
          })

          request.params.game_names_id = mygame[0].id
          gameface.decrementGameCounter({ auth, request, response })

          mygame = await Database.table('game_names').where({
            game_name: request.input('game_name'),
          })

          request.params.game_names_id = mygame[0].id
          gameface.incrementGameCounter({ auth, request, response })
        }

        const updateesports_Exp = await EsportsExperience.query()
          .where({ id: request.params.id })
          .update({
            role_title: request.input('role_title'),
            game_name: request.input('game_name'),
            team_name: request.input('team_name'),
            duration: request.input('duration'),
            achievements: request.input('achievements'),
            skills: request.input('skills'),
          })
        return 'Saved successfully'
      } catch (error) {
        console.log(updateesports_Exp)
      }
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        let gameface = new GameNameController()

        const game_experiences = await Database.table('esports_experiences').where({
          id: request.params.id,
        })

        const mygame = await Database.table('game_names').where({
          game_name: game_experiences[0].game_name,
        })

        request.params.game_names_id = mygame[0].id
        gameface.decrementGameCounter({ auth, request, response })

        const delete_esport_exp = await Database.table('esports_experiences')
          .where({
            id: request.params.id,
          })
          .delete()

        return 'Deleted successfully'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async show({ auth, request, response }) {
    try {
      const esportsExperience = await EsportsExperience.query()
        .where({ user_id: request.params.id })
        .fetch()
      return {
        esportsExperience,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async esportsSearchResults({ auth, request, response }) {
    var arrTags = ''
    var skill_1 = null,
      skill_2 = null,
      skill_3 = null,
      skill_4 = null,
      skill_5 = null

    if (request.input('skills') != null && request.input('skills') != '') {
      arrTags = request.input('skills').split(',')

      for (var i = 0; i < arrTags.length; i++) {
        switch (i) {
          case 0:
            skill_1 = arrTags[i]
            break
          case 1:
            skill_2 = arrTags[i]
            break
          case 2:
            skill_3 = arrTags[i]
            break
          case 3:
            skill_4 = arrTags[i]
            break
          case 4:
            skill_5 = arrTags[i]
            break
        }
      }
    }

    try {
      const latestGameExperiences = await Database.from('esports_experiences')
        .innerJoin('users', 'users.id', 'esports_experiences.user_id')
        .where((builder) => {
          if (request.input('game_name') != null) builder.where('game_name', 'like', '%' + request.input('game_name') + '%')

          if (request.input('role_title') != null) builder.where('role_title', 'like', '%' + request.input('role_title') + '%')

          if (request.input('team_name') != null) builder.where('team_name', 'like', '%' + request.input('team_name') + '%')

          if (request.input('duration') != null) builder.where('duration', request.input('duration'))

          if (skill_1 != null) builder.where('skills', 'like', '%' + skill_1 + '%')

          if (skill_2 != null) builder.where('skills', 'like', '%' + skill_2 + '%')

          if (skill_3 != null) builder.where('skills', 'like', '%' + skill_3 + '%')

          if (skill_4 != null) builder.where('skills', 'like', '%' + skill_4 + '%')

          if (skill_5 != null) builder.where('skills', 'like', '%' + skill_5 + '%')

          if (request.input('country') != null) builder.where('country', request.input('country'))
        })
        .orderBy('esports_experiences.created_at', 'desc')
        .select('*', 'esports_experiences.id', 'users.id as user_id')
        .paginate(parseInt(request.input('counter')), 10)

      return {
        latestGameExperiences,
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = EsportsExperienceController
