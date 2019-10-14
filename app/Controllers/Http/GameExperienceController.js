'use strict'

const Database = use('Database')
const GameExperiences = use("App/Models/GameExperience")

class GameExperienceController {
  async store({auth, request, response}){
    try{
      const newGameExp = await GameExperiences.create({
        game_name: request.input('game_name'),
        user_id: auth.user.id,
        experience: request.input('experience'),
        comments: request.input('comments'),
        status: request.input('status'),
        played: request.input('played'),
        link: request.input('link'),
        ratings: request.input('ratings'),
        tags: request.input('tags')
      })
    }
    catch(error){
      console.log(error);
    }
    return 'Saved item'
  }

  async show({auth, request, response}){
    try{
      const allGameExperiences = await GameExperiences.query().where('user_id', '=', request.params.id).fetch()
      return {
        allGameExperiences
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async show_Game({auth, request, response}){
    try{
      const myGameExperience = await GameExperiences.query().where({user_id: request.params.id, id: request.params.game_id}).fetch() //bobo didnt need user_id
      return {
        myGameExperience
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async myShow({auth, request, response}){
    try{
      const myGameExperience = await GameExperiences.query().where({id: request.params.id}).fetch()
      return {
        myGameExperience
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async update({auth, request, response}){
    try{
      const updateGame_Exp = await GameExperiences.query().where({user_id: request.params.id, id: request.params.game_id}).update({game_name: request.input('game_name'), experience: request.input('experience'), comments: request.input('comments'), status: request.input('status'), played: request.input('played'), link: request.input('link'), ratings: request.input('ratings'), tags: request.input('tags') })
      return 'Saved successfully'

    } catch(error){
      console.log(updateGame_Exp)
    }
  }

  async updateCommend({auth, request, response}){
    try{
      const updateGame_ExpCommend = await GameExperiences.query().where({id: request.params.game_exp_id}).update({commendation: request.input('commendation')})
      return 'Saved successfully'

    } catch(error){
      console.log(updateGame_ExpCommend)
    }
  }

  async destroy({auth, request, response}){
    if(auth.user){
      try{
        const delete_game_exp = await Database.table('game_experiences').where({
          id: request.params.game_id,
        }).delete()

        console.log(delete_game_exp)
        return 'Deleted successfully'

      } catch(error){
        console.log(error)
      }
    } else{
      return 'You are not Logged In!'
    }
  }

  async gameExpSearchResults({auth, request, response}){
    try{
      var counter = 0
      var mySQL = ""

      var inputValueGameName = request.params.gameNamestr.replace(/1981%60%5E/g,"")
      if (inputValueGameName != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE game_experiences.game_name Like "
        }
        else {
          mySQL = mySQL + " AND game_experiences.game_name Like "
        }
        counter = counter + 1
        inputValueGameName = inputValueGameName.replace(/%20/g,"\%")
        inputValueGameName = inputValueGameName.replace(/%25/g,"\\")
        inputValueGameName = "'%" + inputValueGameName + "%'"
        mySQL = mySQL + inputValueGameName
      }

      var inputValueRegion = request.params.statusstr.replace(/1981%60%5E/g,"")
      if (inputValueRegion != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE game_experiences.status Like "
        }
        else {
          mySQL = mySQL + " AND game_experiences.status Like "
        }
        counter = counter + 1
        inputValueRegion = inputValueRegion.replace(/%20/g,"\%")
        inputValueRegion = inputValueRegion.replace(/%25/g,"\\")
        inputValueRegion = "'%" + inputValueRegion + "%'"
        mySQL = mySQL + inputValueRegion
      }

      var inputValueExp = request.params.expstr.replace(/1981%60%5E/g,"")
      if (inputValueExp != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE game_experiences.experience Like "
        }
        else {
          mySQL = mySQL + " AND game_experiences.experience Like "
        }
        counter = counter + 1
        inputValueExp = inputValueExp.replace(/%20/g,"\%")
        inputValueExp = inputValueExp.replace(/%25/g,"\\")
        inputValueExp = "'%" + inputValueExp + "%'"
        mySQL = mySQL + inputValueExp
      }

      var inputValuePlatform = request.params.playedstr.replace(/1981%60%5E/g,"")
      if (inputValuePlatform != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE game_experiences.played Like "
        }
        else {
          mySQL = mySQL + " AND game_experiences.played Like "
        }
        counter = counter + 1
        inputValuePlatform = inputValuePlatform.replace(/%20/g,"\%")
        inputValuePlatform = inputValuePlatform.replace(/%25/g,"\\")
        inputValuePlatform = "'%" + inputValuePlatform + "%'"
        mySQL = mySQL + inputValuePlatform
      }

      var inputValueDesc = request.params.ratingsstr.replace(/1981%60%5E/g,"")
      if (inputValueDesc != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE game_experiences.ratings Like "
        }
        else {
          mySQL = mySQL + " AND game_experiences.ratings Like "
        }
        counter = counter + 1
        inputValueDesc = inputValueDesc.replace(/%20/g,"\%")
        inputValueDesc = inputValueDesc.replace(/%25/g,"\\")
        inputValueDesc = "'%" + inputValueDesc + "%'"
        mySQL = mySQL + inputValueDesc
      }

      var inputValueCommendation = request.params.commendationstr.replace(/1981%60%5E/g,"")
      if (inputValueCommendation != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE game_experiences.commendation Like "
        }
        else {
          mySQL = mySQL + " AND game_experiences.commendation Like "
        }
        counter = counter + 1
        inputValueCommendation = inputValueCommendation.replace(/%20/g,"\%")
        inputValueCommendation = inputValueCommendation.replace(/%25/g,"\\")
        inputValueCommendation = "'%" + inputValueCommendation + "%'"
        mySQL = mySQL + inputValueCommendation
      }

      var inputValueOther = request.params.tags.replace(/1981%60%5E/g,"")
      if (inputValueOther != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE game_experiences.tags Like "
        }
        else {
          mySQL = mySQL + " AND game_experiences.tags Like "
        }
        counter = counter + 1
        inputValueOther = inputValueOther.replace(/%20/g,"\%")
        inputValueOther = inputValueOther.replace(/%25/g,"\\")
        inputValueOther = "'%" + inputValueOther + "%'"
        mySQL = mySQL + inputValueOther
      }

      var inputValueCountry = request.params.countrystr.replace(/1981%60%5E/g,"")
      if (inputValueCountry != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE users.country Like "
        }
        else {
          mySQL = mySQL + " AND users.country Like "
        }
        counter = counter + 1
        inputValueCountry = inputValueCountry.replace(/%20/g,"\%")
        inputValueCountry = inputValueCountry.replace(/%25/g,"\\")
        inputValueCountry = "'%" + inputValueCountry + "%'"
        mySQL = mySQL + inputValueCountry
      }

      mySQL = mySQL + " Limit 88"

      const latestGameExperiences = await Database.schema.raw("select users.id AS user_id, users.alias, users.profile_img, game_experiences.id, game_experiences.game_name, game_experiences.experience, game_experiences.played, game_experiences.status, game_experiences.ratings, game_experiences.tags, game_experiences.commendation from game_experiences Inner Join users ON game_experiences.user_id = users.id" + mySQL)

      return {
        latestGameExperiences
      }

    } catch(error){
      console.log(error)
    }
  }

}

module.exports = GameExperienceController
