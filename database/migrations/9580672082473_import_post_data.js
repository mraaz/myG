'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Import_dummy_post_data_Schema extends Schema {
  up () {
    //reserve the 1st 100 posts for official myG buisness
    for (var i = 1; i < 101; i++) {
      this
      .raw(`INSERT INTO posts VALUES (${i},'Welcome to myG! Try to find some of your friends or jump into a match. 🥳🎮🥳\n\nGLHF','text','[\"https://myG.gg/user_files/101_1614603065710_bC0Xoz_post_video_1614603065331_yt1s.com+-+Intro+to+myG_360p.mp4\"]',1,NULL,NULL,1,0,'2021-03-01 12:53:38','2021-03-01 12:53:38')`)
    }

  }

  down () {

  }
}

module.exports = Import_dummy_post_data_Schema
