'use strict'
const Database = use('Database')
const Settings = use("App/Models/Setting")

class SettingController {

  async show({auth, request, response}){
    try{
      const mySettings = await Database.from('settings').where({user_id: auth.user.id})
      return {
        mySettings
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async store({auth, request, response}){
    if(auth.user){
      try{
        const saveSettings = await Settings.query().where('user_id', '=', auth.user.id).update({email_notification: request.input('email_notification')})
        return 'Saved successfully'

      } catch(error){
        console.log(saveUser)
      }
    } else {
      return 'You are not Logged In!'
    }
  }
}

module.exports = SettingController
