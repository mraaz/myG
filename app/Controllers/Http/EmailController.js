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
    toAddress = 'mnraaz@gmail.com'
    pin = 123456
    alias = 'RAaz'
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

  async dailyEmails(toAddress) {
    const userList = await Database.from('settings')
      .select('user_id')
      .where('email_daily', '=', 1)

    for (var i = 0; i < userList.length; i++) {
      this.summary_email(userList[0].user_id)
    }
    //console.log('Number of Daily emails: ' + userList.length)
  }

  async weeklyEmails(toAddress) {
    return
    const userList = await Database.from('settings')
      .select('user_id')
      .where('email_weekly', '=', 1)

    for (var i = 0; i < userList.length; i++) {
      this.summary_email(userList[0].user_id)
    }
    //console.log('Number of Weekly emails: ' + userList.length)
  }

  async summary_email(user_id) {
    let email = new AWSEmailController()
    let noti = new NotificationController_v2()

    let myFriendRequests = await noti.getmyFriendRequests(user_id)
    //console.log(myFriendRequests.checkMyFriends[0].no_of_my_notiFriends)

    var auth = { user: { id: user_id } }
    let myRequests = await noti.myRequests({ auth })
    //console.log(myRequests.number_of_notis)

    const requestingUserId = user_id
    const { unreadMessages } = await ChatRepository.fetchUnreadMessages({ requestingUserId })
    //console.log(unreadMessages.length)

    const user_email = await Database.from('users')
      .select('email')
      .where('id', '=', user_id)

    //console.log(user_email[0].email)

    if (
      parseInt(myFriendRequests.checkMyFriends[0].no_of_my_notiFriends) == 0 &&
      parseInt(myRequests.number_of_notis) == 0 &&
      unreadMessages.length == 0
    ) {
      return
    }

    let subject = "myG - The Gamer's platform - Summary: " + new Date(Date.now()).toDateString()
    let body =
      "<p>Hi mate,</p><p>Here is what you've missed:</p><p>Number of friend <a title='myG' href='https://myG.gg/invitation' target='_blank' rel='noopener'>requests</a>:&nbsp;" +
      myFriendRequests.checkMyFriends[0].no_of_my_notiFriends +
      "</p><p>Number of <a title='notifications' href='https://myG.gg/notifications' target='_blank' rel='noopener'>notifications</a>:&nbsp;" +
      myRequests.number_of_notis +
      "</p><p>Number of unread <a title='messages' href='https://myG.gg/messages' target='_blank' rel='noopener'>messages</a>:&nbsp;" +
      unreadMessages.length +
      '</p>'

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
