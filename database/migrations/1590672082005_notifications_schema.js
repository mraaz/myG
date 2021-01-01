'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationsSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('activity_type').unsigned().notNullable().index()
      table.integer('other_user_id').unsigned().notNullable()
      table.foreign('other_user_id').references('users.id').onDelete('cascade')
      table.integer('post_id').unsigned().nullable()
      table.foreign('post_id').references('posts.id').onDelete('cascade')
      table.integer('comment_id').unsigned().nullable()
      table.foreign('comment_id').references('comments.id').onDelete('cascade')
      table.integer('reply_id').unsigned().nullable()
      table.foreign('reply_id').references('replies.id').onDelete('cascade')
      table.integer('schedule_games_id').unsigned().nullable()
      table.foreign('schedule_games_id').references('schedule_games.id').onDelete('cascade')
      table.integer('group_id').unsigned().nullable()
      table.foreign('group_id').references('groups.id').onDelete('cascade')
      table.integer('chat_id').unsigned().nullable()
      table.foreign('chat_id').references('chats.id').onDelete('cascade')
      table.integer('read_status').unsigned().nullable().defaultTo(0).index()
      table.unique(['user_id', 'activity_type', 'schedule_games_id']);
      table.unique(['user_id', 'activity_type', 'post_id']);
      table.unique(['user_id', 'activity_type', 'comment_id']);
      table.unique(['user_id', 'activity_type', 'reply_id']);
      table.unique(['user_id', 'activity_type', 'group_id']);
      table.unique(['user_id', 'activity_type', 'chat_id']);
      table.unique(['user_id', 'other_user_id', 'activity_type', 'schedule_games_id'], 'noti_index_1');
      table.unique(['user_id', 'other_user_id', 'activity_type', 'post_id'], 'noti_index_2');
      table.unique(['user_id', 'other_user_id', 'activity_type', 'comment_id'], 'noti_index_3');
      table.unique(['user_id', 'other_user_id', 'activity_type', 'reply_id'], 'noti_index_4');
      table.unique(['user_id', 'other_user_id', 'activity_type', 'group_id'], 'noti_index_5');
      table.unique(['user_id', 'other_user_id', 'activity_type', 'chat_id'], 'noti_index_6');
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = NotificationsSchema
