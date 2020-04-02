'use strict'

const Email = use('App/Models/Email')
const Database = use('Database')

const AWSEmailController = use('./AWSEmailController')
const NotificationController = use('./NotificationController')
const ChatRepository = require('../../Repositories/Chat')

//https://html-online.com/editor/

class EmailController {
  async welcome_email(toAddress) {
    let email = new AWSEmailController()

    let subject = "Welcome to myG - The Gamer's platform"
    let body =
      "<p>Hi mate,<br /><br /> This will most likely be the first and last email from myG. That's because email is turned off by default. Ofcourse you can update this in the <a title='mySettings' href='https://myG.gg/mySettings' target='_blank' rel='noopener'>Settings</a>.<br /><br /> myG's vision is to improve gamers performance, knowledge and experience and we're going to do that by becoming a kick ass gaming platform, allowing gamers to connect, share and improve.<br /><br />Update your <a title='Profile' href='https://myG.gg/profile' target='_blank' rel='noopener'>Profile</a>, create/join games, reach out to other gamers! <br /><br />P.S If you wish to report bugs or feature requests you can here at our public Trello board.<br /><br />GLHF<br /><br />Raaz<br /><br /><img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/myGame_Logo_black_text.png' alt='myG Logo' width='119' height='67' /></p>"

    email.createEmailnSend(toAddress, subject, body)
  }

  async dailyEmails(toAddress) {
    const userList = await Database.from('settings')
      .select('user_id')
      .where('email_daily', '=', 1)

    for (var i = 0; i < userList.length; i++) {
      this.summary_email(userList[0].user_id)
    }
    console.log('Number of Daily emails: ' + userList.length)
  }

  async weeklyEmails(toAddress) {
    return
    const userList = await Database.from('settings')
      .select('user_id')
      .where('email_weekly', '=', 1)

    for (var i = 0; i < userList.length; i++) {
      this.summary_email(userList[0].user_id)
    }
    console.log('Number of Weekly emails: ' + userList.length)
  }

  async summary_email(user_id) {
    let email = new AWSEmailController()
    let noti = new NotificationController()

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
    return

    let subject = "myG - The Gamer's platform - Summary"
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
}

module.exports = EmailController
