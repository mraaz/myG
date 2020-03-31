'use strict'

const Email = use('App/Models/Email')
const Database = use('Database')

const AWSEmailController = use('./AWSEmailController')
const NotificationController = use('./NotificationController')

//https://html-online.com/editor/

class EmailController {
  async welcome_email(toAddress) {
    let email = new AWSEmailController()

    let subject = "Welcome to myG - The Gamer's platform"
    let body =
      "<p>Hi,<br /><br /> This will most likely be the first and last email from myG. That's because email is turned off by default. Ofcourse you can update this in the <a href='https://myG.gg/mySettings'>Settings</a>.<br /><br /> myG's vision is to improve gamers performance, knowledge and experience and we're going to do that by becoming a kick ass gaming platform, allowing gamers to connect, share and improve.<br /><br />Update your <a href='https://myG.gg/profile'>Profile</a>, create/join games, reach out to other gamers! <br /><br />P.S If you wish to report bugs or feature requests you can here at our public Trello board.<br /><br />GLHF<br /><br />Raaz<br /><br /><img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/myGame_Logo_black_text.png' alt='myG Logo' width='119' height='67' /></p>"

    email.createEmailnSend(toAddress, subject, body)
  }

  async summary_email(toAddress) {
    let email = new AWSEmailController()
    let noti = new NotificationController()

    let myFriendRequests = noti.getmyFriendRequests(101)
    var auth = ''
    auth.user.id = 1

    let myRequests = noti.myRequests(auth)

    //let myChatmsgs = fetchUnreadMessages

    let subject = "myG - The Gamer's platform - Summary"
    let body =
      "<p>Hi,<br /><br /> This will most likely be the first and last email from myG. That's because email is turned off by default. Ofcourse you can update this in the <a href='https://myG.gg/mySettings'>Settings</a>.<br /><br /> myG's vision is to improve gamers performance, knowledge and experience and we're going to do that by becoming a kick ass gaming platform, allowing gamers to connect, share and improve.<br /><br />Update your <a href='https://myG.gg/profile'>Profile</a>, create/join games, reach out to other gamers! <br /><br />P.S If you wish to report bugs or feature requests you can here at our public Trello board.<br /><br />GLHF<br /><br />Raaz<br /><br /><img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/myGame_Logo_black_text.png' alt='myG Logo' width='119' height='67' /></p>"

    email.createEmailnSend(toAddress, subject, body)
  }
}

module.exports = EmailController
