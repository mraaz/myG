'use strict'

const Database = use('Database')
const GameExperiences = use('App/Models/GameExperience')
const GameNameController = use('./GameNameController')
const TagController = use('./TagController')

class GameExperienceController {
  async store({ auth, request, response }) {
    if (auth.user) {
      if (/['/.%#$;`\\]/.test(request.input('tags'))) {
        return false
      }
      if (/['/.%#$;`\\]/.test(request.input('game_name'))) {
        return false
      }
      if (request.input('status') == '') {
        return false
      }

      let gameface = new GameNameController()

      const mygame = await Database.table('game_names').where({
        game_name: request.input('game_name'),
      })

      if (mygame.length == 0) {
        var results = await gameface.store({ auth, request, response })
        if (results == false) {
          return
        }
        request.params.game_names_id = results.id
      } else {
        request.params.game_names_id = mygame[0].id
      }

      let tagme = new TagController()

      var arrTags = request.input('tags').split(',')

      for (var i = 0; i < arrTags.length; i++) {
        var current_tag = await Database.table('tags').where({
          game_names_id: request.params.game_names_id,
          tag: arrTags[i],
        })
        if (current_tag.length == 0) {
          request.params.tag = arrTags[i]
          tagme.store_backend({ auth, request, response })
        }
      }

      try {
        const newGameExp = await GameExperiences.create({
          game_names_id: request.params.game_names_id,
          user_id: auth.user.id,
          experience: request.input('experience'),
          comments: request.input('comments'),
          status: request.input('status'),
          played: request.input('played'),
          link: request.input('link'),
          ratings: request.input('ratings'),
          tags: request.input('tags'),
        })

        gameface.incrementGameCounter({ auth, request, response })
      } catch (error) {
        console.log(error)
      }
      return 'Saved item'
    }
  }

  async show({ auth, request, response }) {
    try {
      // const allGameExperiences = await GameExperiences.query()
      //   .where('user_id', '=', request.params.id)
      //   .fetch()

      const allGameExperiences = await Database.table('game_experiences')
        .innerJoin('game_names', 'game_names.id', 'game_experiences.game_names_id')
        .where('game_experiences.user_id', '=', request.params.id)
        .select('game_experiences.*', 'game_names.game_name')
      return {
        allGameExperiences,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async show_Game({ auth, request, response }) {
    try {
      // const myGameExperience = await GameExperiences.query()
      //   .where({ id: request.params.game_id })
      //   .fetch()

      const myGameExperience = await Database.table('game_experiences')
        .innerJoin('game_names', 'game_names.id', 'game_experiences.game_names_id')
        .where('game_experiences.id', '=', request.params.game_id)
        .select('game_experiences.*', 'game_names.game_name')
      return {
        myGameExperience,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async myShow({ auth, request, response }) {
    try {
      // const myGameExperience = await GameExperiences.query()
      //   .where({ id: request.params.id })
      //   .fetch()

      const myGameExperience = await Database.table('game_experiences')
        .innerJoin('game_names', 'game_names.id', 'game_experiences.game_names_id')
        .where('game_experiences.id', '=', request.params.id)
        .select('game_experiences.*', 'game_names.game_name')
      return {
        myGameExperience,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async update({ auth, request, response }) {
    if (auth.user) {
      if (/['/.%#$;`\\]/.test(request.input('tags'))) {
        return false
      }
      try {
        // const game_experiences = await Database.table('game_experiences').where({
        //   id: request.params.game_id,
        // })

        const game_experiences = await Database.table('game_experiences')
          .innerJoin('game_names', 'game_names.id', 'game_experiences.game_names_id')
          .where('game_experiences.id', '=', request.params.game_id)
          .select('game_experiences.*', 'game_names.game_name')

        if (game_experiences.length == 0) {
          return
        }

        request.params.game_names_id = game_experiences[0].game_names_id

        if (game_experiences[0].game_name !== request.input('game_name')) {
          let gameface = new GameNameController()

          // let mygame = await Database.table('game_names').where({
          //   game_name: game_experiences[0].game_name,
          // })

          //request.params.game_names_id = mygame[0].id
          request.params.game_names_id = game_experiences[0].game_names_id
          gameface.decrementGameCounter({ auth, request, response })

          mygame = await Database.table('game_names').where({
            game_name: request.input('game_name'),
          })

          request.params.game_names_id = mygame[0].id
          gameface.incrementGameCounter({ auth, request, response })
        }

        const updateGame_Exp = await GameExperiences.query()
          .where({ id: request.params.game_id })
          .update({
            game_names_id: request.params.game_names_id,
            experience: request.input('experience'),
            comments: request.input('comments'),
            status: request.input('status'),
            played: request.input('played'),
            link: request.input('link'),
            ratings: request.input('ratings'),
            tags: request.input('tags'),
          })
        return 'Saved successfully'
      } catch (error) {
        console.log(error)
      }
    }
  }

  async updateCommend({ auth, request, response }) {
    if (auth.user) {
      try {
        const updateGame_ExpCommend = await GameExperiences.query()
          .where({ id: request.params.game_exp_id })
          .update({ commendation: request.input('commendation') })
        return 'Saved successfully'
      } catch (error) {
        console.log(error)
      }
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        let gameface = new GameNameController()

        const game_experiences = await Database.table('game_experiences').where({
          id: request.params.game_id,
        })

        // const mygame = await Database.table('game_names').where({
        //   game_name: game_experiences[0].game_name,
        // })

        // request.params.game_names_id = mygame[0].id
        request.params.game_names_id = game_experiences[0].game_names_id
        gameface.decrementGameCounter({ auth, request, response })

        const delete_game_exp = await Database.table('game_experiences')
          .where({
            id: request.params.game_id,
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

  async gameExpSearchResults({ auth, request, response }) {
    var arrTags = ''
    var skill_1 = null,
      skill_2 = null,
      skill_3 = null,
      skill_4 = null,
      skill_5 = null

    if (request.input('tags') != null && request.input('tags') != '') {
      arrTags = request.input('tags').split(',')

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
      const latestGameExperiences = await Database.from('game_experiences')
        .innerJoin('users', 'users.id', 'game_experiences.user_id')
        .innerJoin('game_names', 'game_names.id', 'game_experiences.game_names_id')
        .where((builder) => {
          if (request.input('game_name') != null) builder.where('game_name', 'like', '%' + request.input('game_name') + '%')

          if (request.input('status') != null) builder.where('status', 'like', '%' + request.input('status') + '%')

          if (request.input('played') != null) builder.where('played', 'like', '%' + request.input('played') + '%')

          if (request.input('ratings') != null) builder.where('ratings', request.input('ratings'))

          if (request.input('commendation') != null) builder.where('commendation', 'like', '%' + request.input('commendation') + '%')

          if (skill_1 != null) builder.where('tags', 'like', '%' + skill_1 + '%')

          if (skill_2 != null) builder.where('tags', 'like', '%' + skill_2 + '%')

          if (skill_3 != null) builder.where('tags', 'like', '%' + skill_3 + '%')

          if (skill_4 != null) builder.where('tags', 'like', '%' + skill_4 + '%')

          if (skill_5 != null) builder.where('tags', 'like', '%' + skill_5 + '%')

          if (request.input('country') != null) builder.where('country', request.input('country'))
        })
        .orderBy('game_experiences.created_at', 'desc')
        .select('game_experiences.*', 'game_experiences.id', 'users.id as user_id', 'users.profile_img', 'game_names.game_name')
        .paginate(parseInt(request.input('counter')), 10)

      return {
        latestGameExperiences,
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = GameExperienceController
