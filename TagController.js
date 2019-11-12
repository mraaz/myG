'use strict'

const Tags = use("App/Models/Tag")

class TagController {

  async store({auth, request, response}){
    if(auth.user){
      try{
        const newGameTag = await Tags.create({
          game_names_id: request.input('game_names_id'),
          tag: request.input('tag'),
        })
        return 'Saved item'
      }
      catch(error){
        console.log(error);
      }
    }
  }

  async show({auth, request, response}){
    try{
      const allTags = await Tags.query().fetch()
      return {
        allTags
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async show2({auth, request, response}){
    try{
      const allTags = await Tags.query().where('game_names_id', '=', request.params.id).fetch()
      //const allTags = await Tags.query().fetch()
      return {
        allTags
      }
    }
    catch(error){
      console.log(error)
    }
  }
}

module.exports = TagController
