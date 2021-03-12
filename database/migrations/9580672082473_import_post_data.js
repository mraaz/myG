'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Import_dummy_post_data_Schema extends Schema {
  up () {
    //reserve the 1st 100 posts for official myG buisness
    var i = 1
    this
    .raw(`INSERT INTO posts VALUES (${i},'Welcome to myG! Try to find some of your friends or jump into a match. 🥳🎮🥳\n\nGLHF','','text','[\"https://myG.gg/stock_images/yt1s.com+-+Intro+to+myG_360p.mp4\"]',1,NULL,NULL,1,0,'2021-03-13','2021-03-13')`)

    i = 2
    this
    .raw(`INSERT INTO posts VALUES (${i},'Like what you see? Provide us feedback on Github [1], back our kickstarter [2] and help this platform grow to become a place you can truly call home.\n\n[1] - https://github.com/mraaz/myG.gg\n[2] - Kickstarter.com','','text','[\"https://myG.gg/stock_images/MYG_Linkedin_Post+(1).jpg\"]',1,NULL,NULL,1,0,'2021-03-13','2021-03-13')`)

    i = 3
    this
    .raw(`INSERT INTO posts VALUES (${i},"While using myG, we want the gamers to treat each other with respect. That is why we\'ve created the gamer\'s code [1]. Please have a read of this and if you wish to contribute to this or just want to report any issues, please do so via Github [2].\n\n[1] - https://myg.gg/gamers_code\n[2] - https://github.com/mraaz/myG.gg",'','text','[\"https://myG.gg/stock_images/logo_final_black.PNG\"]',1,NULL,NULL,1,0,'2021-03-13','2021-03-13')`)

    for (var i = 4; i < 101; i++) {
      this
      .raw(`INSERT INTO posts VALUES (${i},'Welcome to myG! Try to find some of your friends or jump into a match. 🥳🎮🥳\n\nGLHF','','text','[\"https://myG.gg/user_files/101_1614603065710_bC0Xoz_post_video_1614603065331_yt1s.com+-+Intro+to+myG_360p.mp4\"]',1,NULL,NULL,0,0,'2021-03-13','2021-03-13')`)
    }
  }

  down () {

  }
}

module.exports = Import_dummy_post_data_Schema
