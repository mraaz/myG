'use strict'

const Email = use('App/Models/Email')
const ExtraSeatsCodes = use('App/Models/ExtraSeatsCodes')
const Database = use('Database')

const AWSEmailController = use('./AWSEmailController')
const NotificationController_v2 = use('./NotificationController_v2')
const ChatRepository = require('../../Repositories/Chat')

//https://html-online.com/editor/

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
    const body = `<p>Hi mate,<br /><br /> This will most likely be the first and last email from myG. That's because email is turned off by default. Ofcourse you can update this in the <a title="mySettings" href="https://myG.gg/mySettings" target="_blank" rel="noopener">Settings</a>.<br /><br /> myG's vision is to improve gamers performance, knowledge and experience and we're going to do that by becoming a kick ass gaming platform, allowing gamers to connect, share and improve.<br /><br />This key will be used to access your chat history.<br /><strong>${pin}</strong><br /> Everytime you log off, you key is cleared and when you log back in, you will need to RE-ENTER this key. Failure to do so will disable chat and if a new key is generated, you will LOSE all your previous chat history. <br /> This is a true End to End encryption chat, meaning myG doesn't have any visibility of your messages or your key. Therefore we cannot retrieve messages or key if they are lost <br /><br />Update your <a title="Profile" href="https://myG.gg/profile" target="_blank" rel="noopener">Profile</a>, create/join games, reach out to other gamers!</p>
<p><br />P.S If you wish to report bugs or make feature requests you can <a href="https://github.com/mraaz/myG_RoadMap" target="_blank" rel="noopener">here</a>.&nbsp;</p>
<p>&nbsp;</p>
<p>P.P.S Wait there's more, you also get three invite codes for your friends. They expire in 14 days!</p>
<p>Code 1: ${tmp_code[0]}</p>
<p>Code 2: ${tmp_code[1]}</p>
<p>Code 3:&nbsp;${tmp_code[2]}</p>
<p><br /><br />GLHF<br /><br />Raaz<br /><br /><img src="https://mygame-media.s3.amazonaws.com/logos/myGame_Logo_black_text.png" alt="myG Logo" width="119" height="67" /></p>`
    email.createEmailnSend(toAddress, subject, body)
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
