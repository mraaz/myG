'use strict'

//const ExtraSeatsCodes = use('App/Models/ExtraSeatsCodes')
const Database = use('Database')

const AWSEmailController = use('./AWSEmailController')
const NotificationController_v2 = use('./NotificationController_v2')
const Email_body = use('./EmailBodyController')

const EncryptionRepository = require('../../Repositories/Encryption')

//https://html5-editor.net/

// const generateRandomString = (length) => {
//   var result = ''
//   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   var charactersLength = characters.length
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength))
//   }
//   return result
// }

class EmailController {
  async welcome_email(toAddress, pin, alias) {
    const email = new AWSEmailController()
    const email_welcome_body = new Email_body()

    // let tmp_code = []
    // tmp_code[0] = 'MYG-' + alias.substring(0, 4) + generateRandomString(6) + toAddress.substring(0, 1)
    // tmp_code[1] = 'MYG-' + alias.substring(0, 4) + generateRandomString(5) + toAddress.substring(0, 2)
    // tmp_code[2] = 'MYG-' + alias.substring(0, 4) + generateRandomString(6) + toAddress.substring(0, 1)

    // var fortnightAway = new Date(Date.now() + 12096e5)

    // for (let i = 0; i < tmp_code.length; i++) {
    //   ExtraSeatsCodes.create({
    //     code: tmp_code[i],
    //     expiry: fortnightAway
    //   })
    // }

    const subject = "Welcome to myG - The Gamer's platform"
    const body = await email_welcome_body.welcome_body_no_codes(pin, alias) //, tmp_code[0], tmp_code[1], tmp_code[2])
    email.createEmailnSend(toAddress, subject, body)
    return
  }

  async dailyEmails() {
    //ToDo: Doesnt scale for millions of records, we can chunk the update

    //Only EMAIL if we have NOT sent you an email in the last 24 hours
    let today = new Date()
    let priorDate = new Date(new Date(today).getTime() - 60 * 60 * 23 * 1000)
    const cutOff_date = new Date(priorDate)

    const userList = await Database.from('settings')
      .innerJoin('users', 'users.id', 'settings.user_id')
      .select('users.id', 'users.email', 'users.alias')
      .where('settings.email_notification', '=', 2)
      .where('email_notification_last_runtime', '<', cutOff_date)

    let myArr = []

    for (let i = 0; i < userList.length; i++) {
      myArr.push(userList[i].id)
      this.summary_email(userList[i].id, userList[i].email, userList[i].alias)
    }

    await Database.from('settings').whereIn('user_id', myArr).update({ email_notification_last_runtime: today })
  }

  async weeklyEmails() {
    //ToDo: Doesnt scale for millions of records, we can chunk the update

    //Only EMAIL if we have NOT sent you an email in the last six day
    let today = new Date()
    let priorDate = new Date().setDate(today.getDate() - 6)
    const cutOff_date = new Date(priorDate)

    const userList = await Database.from('settings')
      .innerJoin('users', 'users.id', 'settings.user_id')
      .select('users.id', 'users.email', 'users.alias')
      .where('settings.email_notification', '=', 1)
      .where('email_notification_last_runtime', '<', cutOff_date)

    let myArr = []

    for (let i = 0; i < userList.length; i++) {
      myArr.push(userList[i].id)
      this.summary_email(userList[i].id, userList[i].email, userList[i].alias)
    }

    await Database.from('settings').whereIn('user_id', myArr).update({ email_notification_last_runtime: today })
  }

  async summary_email(user_id, user_email, user_alias) {
    const noti = new NotificationController_v2()
    const auth = { user: { id: user_id } }
    const myRequests = await noti.count({ auth })

    if (parseInt(myRequests.approvals) == 0 && parseInt(myRequests.alerts) == 0 && parseInt(myRequests.chats) == 0) {
      return
    }

    const email_summary_email = new Email_body()
    const email = new AWSEmailController()

    const subject = "myG - The Gamer's platform - Summary: " + new Date(Date.now()).toDateString()
    const body = await email_summary_email.summary_body(user_alias, myRequests.approvals, myRequests.alerts, myRequests.chats)
    email.createEmailnSend(await EncryptionRepository.decryptField(user_email), subject, body, user_id)
    return
  }

  async encryption_email(email, pin) {
    const awsEmailController = new AWSEmailController()
    const email_summary_email = new Email_body()

    const subject = 'myG Chat password - CONFIDENTIAL COMMUNICATION'
    const body = await email_summary_email.encryption_body(pin)

    return awsEmailController.createEmailnSend(email, subject, body)
  }
}

module.exports = EmailController
