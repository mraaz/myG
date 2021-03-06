'use strict'

const Email = use('App/Models/Email')
const ExtraSeatsCodes = use('App/Models/ExtraSeatsCodes')
const Database = use('Database')

const AWSEmailController = use('./AWSEmailController')
const NotificationController_v2 = use('./NotificationController_v2')
const Email_body = use('./EmailBodyController')

const ChatRepository = require('../../Repositories/Chat')

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
    // toAddress = 'mnraaz@gmail.com'
    // pin = 123456
    // alias = 'RAaz'
    const email = new AWSEmailController()
    const email_welcome_body = new Email_body()

    let tmp_code = []
    tmp_code[0] = 'MYG:' + alias.substring(0, 4) + generateRandomString(6) + toAddress.substring(0, 1)
    tmp_code[1] = 'MYG:' + alias.substring(0, 4) + generateRandomString(5) + toAddress.substring(0, 2)
    tmp_code[2] = 'MYG:' + alias.substring(0, 4) + generateRandomString(6) + toAddress.substring(0, 1)

    var fortnightAway = new Date(Date.now() + 12096e5)

    for (let i = 0; i < tmp_code.length; i++) {
      const newCodes = await ExtraSeatsCodes.create({
        code: tmp_code[i],
        expiry: fortnightAway,
      })
    }

    const subject = "Welcome to myG - The Gamer's platform"
    const body = await email_welcome_body.welcome_body(pin, alias, tmp_code[0], tmp_code[1], tmp_code[2])
    email.createEmailnSend(toAddress, subject, body)
    return
  }

  async dailyEmails() {
    console.log('RAAAZ')
    const userList = await Database.from('settings')
      .select('user_id')
      .where('email_notification', '=', 2)

    for (let i = 0; i < userList.length; i++) {
      this.summary_email(userList[i].user_id)
    }
  }

  async weeklyEmails() {
    const userList = await Database.from('settings')
      .select('user_id')
      .where('email_notification', '=', 1)

    for (let i = 0; i < userList.length; i++) {
      this.summary_email(userList[i].user_id)
    }
  }

  async summary_email(user_id) {
    console.log('GOT here1')
    let email = new AWSEmailController()
    let noti = new NotificationController_v2()

    let myFriendRequests = await noti.getmyFriendRequests(user_id)
    //console.log(myFriendRequests.checkMyFriends[0].no_of_my_notiFriends)

    let auth = { user: { id: user_id } }
    let myRequests = await noti.count({ auth })

    // const requestingUserId = user_id
    // const { unreadMessages } = await ChatRepository.fetchUnreadMessages({ requestingUserId })
    //console.log(unreadMessages.length)

    const user_deets = await Database.from('users')
      .where('id', '=', user_id)
      .select('email', 'alias')
      .first()

    console.log('GOT here2')
    // if (parseInt(myRequests.approvals) == 0 && parseInt(myRequests.alerts) == 0 && parseInt(myRequests.chats) == 0) {
    //   return
    // }
    console.log('GOT here3')
    const email_summary_email = new Email_body()

    const subject = "myG - The Gamer's platform - Summary: " + new Date(Date.now()).toDateString()
    let body = await email_summary_email.summary_body(user_deets.alias, myRequests.approvals, myRequests.alerts, myRequests.chats)
    console.log('GOT here')
    email.createEmailnSend('mnraaz@gmail.com', subject, body)
  }

  async encryption_email(email, pin) {
    const awsEmailController = new AWSEmailController()
    const subject = 'myG Chat password - CONFIDENTIAL COMMUNICATION'
    const body = `Hi, <br> This password will be used to access your chat history.<br><strong>${pin}</strong><br><br> Everytime you log off, your password is cleared and when you log back in, you will need to RE-ENTER this password. Failure to do so will disable chat and if a new password is generated, you will LOSE all your previous chat history. <br><br> This is a true End to End encryption chat, meaning myG doesn't have any visibility of your messages or your password. Therefore we cannot retrieve messages or key if they are lost <br><br> Cheers, <br><br> myG`
    return awsEmailController.createEmailnSend(email, subject, body)
  }
}

module.exports = EmailController
