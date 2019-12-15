'use strict'

const EsportsExperience = use('App/Models/EsportsExperience')
const Database = use('Database')

class EsportsExperienceController {
  async store({ auth, request, response }) {
    if (auth.user) {
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
    try {
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

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
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
    try {
      const latestGameExperiences = await Database.from('esports_experiences')
        .innerJoin('users', 'users.id', 'esports_experiences.user_id')
        .where((builder) => {
          if (request.input('game_name') != null) builder.where('game_name', 'like', '%' + request.input('game_name') + '%')

          if (request.input('role_title') != null) builder.where('role_title', 'like', '%' + request.input('role_title') + '%')

          if (request.input('team_name') != null) builder.where('team_name', 'like', '%' + request.input('team_name') + '%')

          if (request.input('duration') != null) builder.where('duration', request.input('duration'))

          if (request.input('skills') != null) builder.where('skills', 'like', '%' + request.input('skills') + '%')

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

  async esportsSearchResults2({ auth, request, response }) {
    try {
      var counter = 0
      var mySQL = ''

      var inputValueGameName = request.params.gameNamestr.replace(/1981%60%5E/g, '')
      if (inputValueGameName != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE esports_experiences.game_name Like '
        } else {
          mySQL = mySQL + ' AND esports_experiences.game_name Like '
        }
        counter = counter + 1
        inputValueGameName = inputValueGameName.replace(/%20/g, '%')
        inputValueGameName = inputValueGameName.replace(/%25/g, '\\')
        inputValueGameName = "'%" + inputValueGameName + "%'"
        mySQL = mySQL + inputValueGameName
      }

      var inputValueExp = request.params.rolestr.replace(/1981%60%5E/g, '')
      if (inputValueExp != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE esports_experiences.role_title Like '
        } else {
          mySQL = mySQL + ' AND esports_experiences.role_title Like '
        }
        counter = counter + 1
        inputValueExp = inputValueExp.replace(/%20/g, '%')
        inputValueExp = inputValueExp.replace(/%25/g, '\\')
        inputValueExp = "'%" + inputValueExp + "%'"
        mySQL = mySQL + inputValueExp
      }

      var inputValuePlatform = request.params.teamstr.replace(/1981%60%5E/g, '')
      if (inputValuePlatform != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE esports_experiences.team_name Like '
        } else {
          mySQL = mySQL + ' AND esports_experiences.team_name Like '
        }
        counter = counter + 1
        inputValuePlatform = inputValuePlatform.replace(/%20/g, '%')
        inputValuePlatform = inputValuePlatform.replace(/%25/g, '\\')
        inputValuePlatform = "'%" + inputValuePlatform + "%'"
        mySQL = mySQL + inputValuePlatform
      }

      var inputValueDesc = request.params.time_role.replace(/1981%60%5E/g, '')
      if (inputValueDesc != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE esports_experiences.duration = '
        } else {
          mySQL = mySQL + ' AND esports_experiences.duration = '
        }
        counter = counter + 1
        inputValueDesc = inputValueDesc.replace(/%20/g, '%')
        inputValueDesc = inputValueDesc.replace(/%25/g, '\\')
        //inputValueDesc = "'%" + inputValueDesc + "%'"
        mySQL = mySQL + inputValueDesc
      }

      var inputValueOther = request.params.tags.replace(/1981%60%5E/g, '')
      if (inputValueOther != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE esports_experiences.skills Like '
        } else {
          mySQL = mySQL + ' AND esports_experiences.skills Like '
        }
        counter = counter + 1
        inputValueOther = inputValueOther.replace(/%20/g, '%')
        inputValueOther = inputValueOther.replace(/%25/g, '\\')
        inputValueOther = "'%" + inputValueOther + "%'"
        mySQL = mySQL + inputValueOther
      }

      var inputValueCountry = request.params.countrystr.replace(/1981%60%5E/g, '')
      if (inputValueCountry != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE users.country Like '
        } else {
          mySQL = mySQL + ' AND users.country Like '
        }
        counter = counter + 1
        inputValueCountry = inputValueCountry.replace(/%20/g, '%')
        inputValueCountry = inputValueCountry.replace(/%25/g, '\\')
        inputValueCountry = "'%" + inputValueCountry + "%'"
        mySQL = mySQL + inputValueCountry
      }

      mySQL = mySQL + ' Limit 188'

      const latestGameExperiences = await Database.schema.raw(
        'select users.id AS user_id, users.alias, users.profile_img, esports_experiences.id, esports_experiences.game_name, esports_experiences.role_title, esports_experiences.team_name, esports_experiences.duration, esports_experiences.skills from esports_experiences Inner Join users ON esports_experiences.user_id = users.id' +
          mySQL
      )

      return {
        latestGameExperiences,
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = EsportsExperienceController
