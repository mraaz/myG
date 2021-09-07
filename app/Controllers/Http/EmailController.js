'use strict'

const ExtraSeatsCodes = use('App/Models/ExtraSeatsCodes')
const Database = use('Database')

const AWSEmailController = use('./AWSEmailController')
const NotificationController_v2 = use('./NotificationController_v2')
const Email_body = use('./EmailBodyController')

const EncryptionRepository = require('../../Repositories/Encryption')

//https://html5-editor.net/

const generateRandomString = (length) => {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

class EmailController {
  async welcome_email(toAddress, pin, alias) {
    const email = new AWSEmailController()
    const email_welcome_body = new Email_body()

    let tmp_code = []
    tmp_code[0] = 'MYG-' + alias.substring(0, 4) + generateRandomString(6) + toAddress.substring(0, 1)
    tmp_code[1] = 'MYG-' + alias.substring(0, 4) + generateRandomString(5) + toAddress.substring(0, 2)
    tmp_code[2] = 'MYG-' + alias.substring(0, 4) + generateRandomString(6) + toAddress.substring(0, 1)

    var fortnightAway = new Date(Date.now() + 12096e5)

    for (let i = 0; i < tmp_code.length; i++) {
      ExtraSeatsCodes.create({
        code: tmp_code[i],
        expiry: fortnightAway
      })
    }

    const subject = "Welcome to myG - The Gamer's platform"
    const body = await email_welcome_body.welcome_body(pin, alias, tmp_code[0], tmp_code[1], tmp_code[2])
    email.createEmailnSend(toAddress, subject, body)
    return
  }

  async dailyEmails() {
    const userList = await Database.from('settings').select('user_id').where('email_notification', '=', 2)
    for (let i = 0; i < userList.length; i++) {
      this.summary_email(userList[i].user_id)
    }
  }

  async weeklyEmails() {
    const userList = await Database.from('settings').select('user_id').where('email_notification', '=', 1)
    for (let i = 0; i < userList.length; i++) {
      this.summary_email(userList[i].user_id)
    }
  }

  async summary_email(user_id) {
    const noti = new NotificationController_v2()
    const auth = { user: { id: user_id } }
    const myRequests = await noti.count({ auth })

    if (parseInt(myRequests.approvals) == 0 && parseInt(myRequests.alerts) == 0 && parseInt(myRequests.chats) == 0) {
      return
    }

    const user = await Database.from('users').where('id', '=', user_id).select('email', 'alias').first()

    const email_summary_email = new Email_body()
    const email = new AWSEmailController()

    const subject = "myG - The Gamer's platform - Summary: " + new Date(Date.now()).toDateString()
    const body = await email_summary_email.summary_body(user.alias, myRequests.approvals, myRequests.alerts, myRequests.chats)
    await email.createEmailnSend(await EncryptionRepository.decryptField(user.email), subject, body)
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
