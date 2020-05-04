'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.on('/home').render('pages/home')
Route.get('/', 'PageController.home')
Route.get('/home', 'PageController.redirectHome')

//Authentication
Route.get('/register', 'AuthController.register')
Route.post('/register', 'AuthController.storeUser')
Route.get('/login', 'AuthController.login')
Route.post('/login', 'AuthController.loginUser')
Route.get('/forgot-password', 'AuthController.forgotPassword')
Route.get('/logout', 'AuthController.logout')
Route.get('/changepwd', 'AuthController.changepwd')
Route.post('/changepwd', 'AuthController.updatepwd')

//Google Authentication
Route.get('login/google', 'GoogleLoginController.redirect')
Route.get('user/register', 'CommonSaveController.register')
Route.post('/user/save', 'CommonSaveController.saveuser')
Route.get('authenticated/google', 'GoogleLoginController.callback')

//discord Authentication
Route.get('login/discord', 'DiscordLoginController.redirect')
Route.get('authenticated/discord', 'DiscordLoginController.callback')
Route.get('finalauthenticated/discord', 'DiscordLoginController.finalcallback')

//Steam Authentication
Route.get('login/steam', 'SteamLoginController.redirect')
Route.get('authenticated/steam', 'SteamLoginController.callback')

//Facebook Authentication
Route.get('login/facebook', 'FacebookLoginController.redirect')
Route.get('authenticated/facebook', 'FacebookLoginController.callback')

//api
Route.get('/api/initialApp', 'ApiController.initialApp')
Route.post('/api/uploadFile', 'ApiController.uploadFile')
Route.post('/api/deleteFile', 'ApiController.deleteFile')
Route.post('/api/deleteFiles', 'ApiController.deleteFiles')

Route.get('/api/post/:paginateNo', 'PostController.show')
Route.get('/api/mypost/:myDate', 'PostController.myshow')
Route.get('/api/getmypost/:paginateNo', 'PostController.showmyposts')
Route.get('/api/get_group_posts/:id/:paginateNo', 'PostController.get_group_posts')
Route.post('/api/post', 'PostController.store')
Route.post('/api/postphoto', 'PostController.storephoto')
Route.post('/api/postvideo', 'PostController.storevideo')
Route.get('/api/post/my_count/:id', 'PostController.posts_count')
Route.get('/api/post/delete/:id', 'PostController.destroy')
Route.post('/api/post/update/:id', 'PostController.update')
Route.get('/api/getpost/:id', 'PostController.showpost')

Route.post('/api/user', 'UserController.store')
Route.post('/api/userprofile', 'UserController.changeProfile')
Route.post('/api/userprofilebg', 'UserController.changeProfileBg')
Route.get('/api/user/delete', 'UserController.destroy')
Route.get('/api/user/:id', 'UserController.profile')
Route.get('/api/user/getProfile/:alias', 'UserController.profile_with_alias')
Route.get('/api/user/alias/:alias', 'UserController.convertAliastoID')
Route.get('/api/user/:id/addFriend', 'UserController.addFriend')
Route.get('/api/user/:id/unfriend', 'UserController.unfriend')
Route.post('/api/user/playerSearchResults', 'UserController.playerSearchResults')
Route.post('/api/user/keywordSearchResults', 'UserController.keywordSearchResults')

Route.post('/api/GameExperiences/commend/:game_exp_id', 'GameExperienceController.updateCommend')
Route.get('/api/GameExperiences/exp/:id', 'GameExperienceController.myShow')
Route.get('/api/GameExperiences/:id', 'GameExperienceController.show')
Route.post('/api/GameExperiences', 'GameExperienceController.store')
Route.get('/api/GameExperiences/delete/:game_id', 'GameExperienceController.destroy')
Route.post('/api/GameExperiences/:id/:game_id', 'GameExperienceController.update')
Route.get('/api/GameExperiences/:id/:game_id', 'GameExperienceController.show_Game')
Route.post('/api/GameExperiences/gameExpSearchResults', 'GameExperienceController.gameExpSearchResults')

Route.post('/api/ScheduleGame', 'ScheduleGameController.store')
Route.get('/api/ScheduleGame/delete/:id/:reason', 'ScheduleGameController.destroy')
//Route.get('/api/ScheduleGame', 'ScheduleGameController.show')
Route.get('/api/ScheduleGame/:id', 'ScheduleGameController.show_one')
Route.post('/api/ScheduleGame/update_vacany', 'ScheduleGameController.update_vacany')
Route.post('/api/ScheduleGame/getAdmin', 'ScheduleGameController.getAdmin')

Route.get('/api/ArchiveScheduleGame/:id', 'Archive_ScheduleGameController.show_one')
Route.get('/api/ArchiveScheduleGame/filtered_by_one/:id', 'Archive_ScheduleGameController.filtered_by_one')

Route.post('/api/ScheduleGame/scheduleSearchResults', 'ScheduleGameController.scheduleSearchResults')

Route.get('/api/ScheduleGame/filtered_by_one/:id', 'ScheduleGameController.filtered_by_one')

Route.get('/api/myScheduledGames/:limitstr/:exclude_expired', 'ScheduleGameController.myScheduledGames')
Route.get('/api/myScheduledGamesCount/:id', 'ScheduleGameController.myScheduledGamesCount')

Route.get('/api/ArchivemyScheduledGamesCount/:id', 'Archive_ScheduleGameController.myScheduledGamesCount')

Route.get('/api/GameNames', 'GameNameController.show')
Route.get('/api/GameName/:name', 'GameNameController.show_one')
Route.post('/api/GameNames', 'GameNameController.store')
Route.get('/api/GameNames/:int/gameSearchResults', 'GameNameController.gameSearchResults')

Route.get('/api/Tags', 'TagController.show')
Route.post('/api/Tags/getTagsforGames', 'TagController.getTagsforGames')
Route.post('/api/Tags/getTopTagsforGames', 'TagController.getTopTagsforGames')
Route.post('/api/Tags', 'TagController.store')

Route.post('/api/likes/', 'LikeController.store')
Route.get('/api/likes/:id', 'LikeController.show')
Route.get('/api/likes/comment/:id', 'LikeController.show_comments')
Route.get('/api/likes/reply/:id', 'LikeController.show_replies')
Route.get('/api/likes/delete/:id', 'LikeController.destroy')
Route.get('/api/likes/delete/comment/:id', 'LikeController.destroy_comment')
Route.get('/api/likes/delete/reply/:id', 'LikeController.destroy_reply')
Route.get('/api/thisLike/:id', 'LikeController.getthisLike')

Route.get('/api/comments/delete/:id', 'CommentController.destroy')
Route.get('/api/comments/:id', 'CommentController.show')
Route.post('/api/comments/', 'CommentController.store')
Route.get('/api/comments/my_count/:id', 'CommentController.comments_count')
Route.get('/api/comments/show_comment/:id', 'CommentController.show_comment')
Route.post('/api/comments/update/:id', 'CommentController.update')
Route.get('/api/comments/scheduled_games/:id', 'CommentController.show_scheduled_games')
Route.get('/api/comments/scheduled_gamesCount/:id', 'CommentController.show_scheduled_gamesCount')

Route.get('/api/archive_comments/scheduled_gamesCount/:id', 'Archive_CommentController.show_scheduled_gamesCount')
Route.get('/api/archive_comments/scheduled_games/:id', 'Archive_CommentController.show_scheduled_games')

Route.get('/api/replies/delete/:id', 'ReplyController.destroy')
Route.get('/api/replies/:id', 'ReplyController.show')
Route.post('/api/replies/update/:id', 'ReplyController.update')
Route.get('/api/replies/show_reply/:id', 'ReplyController.show_reply')
Route.get('/api/replies/my_count/:id', 'ReplyController.replies_count')
Route.post('/api/replies/', 'ReplyController.store')

Route.post('/api/notifications/getAllNoti', 'NotificationController.getAllNotifications')
Route.post('/api/notifications/addFriend', 'NotificationController.addFriend')
Route.get('/api/notifications/friend/:id', 'NotificationController.checkFriend')
Route.get('/api/notifications/myFriendRequests/', 'NotificationController.myFriendRequests')
Route.post('/api/notifications/allmyFriendRequests/', 'NotificationController.allmyFriendRequests')
Route.get('/api/notifications/myFriendRequest/:id', 'NotificationController.myFriendRequest')
Route.get('/api/notifications/delete/:id', 'NotificationController.destroy')
Route.get('/api/notifications/getAllNotiLike_post/:id', 'NotificationController.getAllNotiLike_post')
Route.get('/api/notifications/getAllNotiLike_comment/:id', 'NotificationController.getAllNotiLike_comment')
Route.get('/api/notifications/getAllNotiLike_reply/:id', 'NotificationController.getAllNotiLike_reply')
Route.get('/api/notifications/getAllNotiComment/:id', 'NotificationController.getAllNotiComment')
Route.get('/api/notifications/getAllNotiReply/:id', 'NotificationController.getAllNotiReply')
Route.post('/api/notifications/addPostLike', 'NotificationController.addPostLike')
Route.get('/api/notifications/deletePostLike/:id', 'NotificationController.deletePostLike')
Route.post('/api/notifications/addCommentLike', 'NotificationController.addCommentLike')
Route.get('/api/notifications/deleteCommentLike/:id', 'NotificationController.deleteCommentLike')
Route.post('/api/notifications/addReplyLike', 'NotificationController.addReplyLike')
Route.get('/api/notifications/deleteReplyLike/:id', 'NotificationController.deleteReplyLike')
Route.post('/api/notifications/addComment', 'NotificationController.addComment')
Route.post('/api/notifications/addReply', 'NotificationController.addReply')
Route.post('/api/notifications/updateRead_Status/:post_id/:activity_type', 'NotificationController.updateRead_Status')
Route.get('/api/notifications/markAllNoti', 'NotificationController.markAllNoti')
Route.get('/api/notifications/deleteAllNoti', 'NotificationController.deleteAllNoti')
Route.get('/api/notifications/getunread/:post_id/:activity_type', 'NotificationController.getRead_Status')
Route.get(
  '/api/notifications/getunread_schedule_game/:schedule_game_id/:activity_type',
  'NotificationController.getRead_Status_schedule_game'
)
Route.get(
  '/api/notifications/getunread_archive_schedule_game/:archive_schedule_game_id/:activity_type',
  'NotificationController.getunread_archive_schedule_game'
)
Route.post('/api/notifications/addScheduleGame/attendance', 'NotificationController.addScheduleGame_attendance')
Route.post(
  '/api/notifications/updateRead_Status_schedule_game/:schedule_game_id/:activity_type',
  'NotificationController.updateRead_Status_schedule_game'
)
Route.post(
  '/api/notifications/updateRead_Status_archive_schedule_game/:archive_schedule_game_id/:activity_type',
  'NotificationController.updateRead_Status_archive_schedule_game'
)
Route.post(
  '/api/notifications/updateRead_Status_groups/:group_id/:activity_type/:user_id',
  'NotificationController.updateRead_Status_groups'
)
Route.post('/api/notifications/updateRead_Status_ding/', 'NotificationController.updateRead_Status_ding')
Route.get(
  '/api/notifications/getAllNotiScheduleGamesAttendees/:schedule_games_id',
  'NotificationController.getAllNotiScheduleGamesAttendees'
)
Route.get('/api/notifications/delete/schedule_game_attendees/:id', 'NotificationController.remove_schedule_game_attendees')
Route.get('/api/notifications/myRequests/', 'NotificationController.myRequests')
Route.post('/api/notifications/addGroup', 'NotificationController.addGroup')
Route.post('/api/notifications/add_all_to_Group', 'NotificationController.add_all_to_Group')
Route.post('/api/notifications/add_vip_to_Group', 'NotificationController.add_vip_to_Group')
Route.get('/api/notifications/delete_group/:id', 'NotificationController.delete_group')
Route.get('/api/notifications/getunread_group/:id/:activity_type', 'NotificationController.getunread_group')
Route.post('/api/notifications/addGameApproved', 'NotificationController.addGameApproved')
Route.put('/api/notifications/inviteToGroup', 'NotificationController.inviteToGroup')
Route.post('/api/notifications/invitations', 'NotificationController.invitations')
Route.get('/api/notifications/getunread_dings', 'NotificationController.getunread_dings')

Route.post('/api/friends/create', 'FriendController.store')
Route.post('/api/friends/allmyFriends', 'FriendController.showallmyFriends')

Route.get('/api/settings', 'SettingController.show')
Route.post('/api/settings', 'SettingController.store')

Route.post('/api/commendations', 'CommendationController.store')
Route.get('/api/commendations/user/:id', 'CommendationController.showUser')
Route.get('/api/commendations/:id', 'CommendationController.show')

Route.get('/api/esports_bio/show', 'EsportsBioController.show')
Route.get('/api/esports_bio/show_bio/:id', 'EsportsBioController.show_bio')
Route.post('/api/esports_bio/create', 'EsportsBioController.store')
Route.post('/api/esports_bio/update', 'EsportsBioController.update')

Route.post('/api/esports_experiences/create', 'EsportsExperienceController.store')
Route.get('/api/esports_experiences/show/:esportsExp_id', 'EsportsExperienceController.show_exp')
Route.post('/api/esports_experiences/update/:id', 'EsportsExperienceController.update')
Route.get('/api/esports_experiences/delete/:id', 'EsportsExperienceController.destroy')
Route.get('/api/esports_experiences/:id', 'EsportsExperienceController.show')
Route.post('/api/esports_experiences/esportsSearchResults', 'EsportsExperienceController.esportsSearchResults')

Route.get('/api/attendees/attending/:id', 'AttendeeController.show_attending')
Route.get('/api/attendees/show_all_pending_attendance/:id', 'AttendeeController.show_all_pending_attendance')
Route.get('/api/attendees/myattendance/:id', 'AttendeeController.show_myattendance')
Route.post('/api/attendees/savemySpot', 'AttendeeController.savemySpot')
Route.get('/api/attendees/removeattending/:id', 'AttendeeController.remove_myattendance')
Route.get('/api/attendees/role_call/:id', 'AttendeeController.role_call')
Route.get('/api/attendees/role_call_ALL/:id', 'AttendeeController.role_call_ALL')
Route.get('/api/attendees/game_positions/:id', 'AttendeeController.show_game_positions')
Route.get('/api/attendees/getScheduleGameInvites/:id', 'AttendeeController.getScheduleGameInvites')
Route.get('/api/attendees/delete_myInvite/:schedule_game_id/:id', 'AttendeeController.delete_invite')
Route.post('/api/attendees/update_invite/:schedule_game_id/:id', 'AttendeeController.up_invite')

Route.get('/api/archive_attendees/attending/:id', 'Archive_AttendeeController.show_attending')
Route.get('/api/archive_attendees/role_call/:id', 'Archive_AttendeeController.role_call')
Route.get('/api/archive_attendees/role_call_ALL/:id', 'Archive_AttendeeController.role_call_ALL')

Route.post('/api/groups/create', 'GroupController.store')
Route.get('/api/groups/groupName/:name', 'GroupController.show_one_name')
Route.get('/api/groups/:str/groupSearchResults', 'GroupController.groupSearchResults')
Route.get('/api/groups/view/:counter', 'GroupController.myshow')
Route.get('/api/groups/:id', 'GroupController.show')
Route.post('/api/groups/update_img', 'GroupController.update_img')
Route.post('/api/groups/update/all_accept/', 'GroupController.update_all_accept')
Route.get('/api/groups/update_type/:id/:group_type', 'GroupController.update_type')
Route.get('/api/groups/show_owner/:id', 'GroupController.show_owner')

Route.get('/api/usergroup/get_all_my_group_approvals/:id', 'UsergroupController.get_all_my_group_approvals')
Route.post('/api/usergroup/create', 'UsergroupController.store')
Route.get('/api/usergroup/view/:counter', 'UsergroupController.myshow')
Route.get('/api/usergroup/:id', 'UsergroupController.show')
Route.get('/api/usergroup/mygroup_details/:id', 'UsergroupController.mygroup_details')
Route.get('/api/usergroup/delete/:id', 'UsergroupController.destroy')
Route.get('/api/usergroup/set_group_approval/:id/:usergrp_id', 'UsergroupController.set_group_approval')
Route.get('/api/usergroup/remove_group_approval/:id/:usergrp_id', 'UsergroupController.remove_group_approval')
Route.get('/api/usergroup/member_lists/:id', 'UsergroupController.member_lists')
Route.get('/api/usergroup/delete_member/:id/:usergrp_id', 'UsergroupController.delete_member')
Route.get('/api/usergroup/promote_member/:id/:usergrp_id', 'UsergroupController.promote_member')
Route.get('/api/usergroup/demote_member/:id/:usergrp_id', 'UsergroupController.demote_member')
Route.get('/api/usergroup/current_member/:id', 'UsergroupController.current_member')

Route.post('/api/followers/create', 'FollowerController.store')
Route.delete('/api/followers/:follower_id/delete', 'FollowerController.delete')

Route.get('/api/email/summary_email', 'EmailController.summary_email')

Route.post('/api/connections/gamers_you_might_know', 'ConnectionController.gamers_you_might_know')
Route.get('/api/connections/i_am_viewing_this_profile/:other_user_id', 'ConnectionController.have_I_viewed_this_profile')
Route.post('/api/connections/communities_you_might_know', 'ConnectionController.communities_you_might_know')

Route.post('/api/invited_users_for_schedule_games/create', 'InvitedUsersForScheduleGameController.store')

// Trying to avoid conflicts, should move this route up later.
Route.get('/api/notifications/outgoingFriendRequests', 'NotificationController.outgoingFriendRequests')

Route.get('/api/userStatTransaction/master_controller', 'UserStatTransactionController.master_controller')

// Aws Key Upload
Route.post('/api/chat/:chatId/icon', 'AwsKeyController.addChatGroupProfileKey')
Route.post('/api/game/:gameId/icon', 'AwsKeyController.addGameIconKey')

// Chat Feature - https://docs.google.com/spreadsheets/d/1AR9P3MLQw6J6eoRqgTbOVROFxmPE215yXzsqD59wy2o
Route.get('/api/chat/', 'ChatController.fetchChats')
Route.get('/api/chat/:chatId', 'ChatController.fetchChat')
Route.post('/api/chat/', 'ChatController.createChat')
Route.put('/api/chat/:chatId', 'ChatController.updateChat')
Route.delete('/api/chat/:chatId', 'ChatController.clearChat')
Route.delete('/api/chat/:chatId/destruction', 'ChatController.checkChatDestruction')
Route.delete('/api/chat/:chatId/delete', 'ChatController.deleteChat')
Route.delete('/api/chat/:chatId/exit', 'ChatController.exitGroup')
Route.delete('/api/chat/:chatId/exit/:userId', 'ChatController.removeFromGroup')
Route.get('/api/chat/:chatId/contacts', 'ChatController.fetchChatContacts')
Route.put('/api/chat/:chatId/contacts', 'ChatController.addContactsToChat')
Route.get('/api/chat/:chatId/message/', 'ChatController.fetchMessages')
Route.get('/api/chat/message/unread', 'ChatController.fetchUnreadMessages')
Route.get('/api/chat/:chatId/message/encryption', 'ChatController.fetchEncryptionMessages')
Route.get('/api/groups', 'ChatController.searchGroup')
Route.post('/api/chat/:chatId/message/', 'ChatController.sendMessage')
Route.put('/api/chat/:chatId/message/:messageId', 'ChatController.editMessage')
Route.delete('/api/chat/:chatId/message/:messageId', 'ChatController.deleteMessage')
Route.post('/api/chat/:chatId/message/:messageId/reaction', 'ChatController.addReaction')
Route.delete('/api/chat/:chatId/message/:messageId/reaction/:reactionId', 'ChatController.removeReaction')
Route.put('/api/chat/:chatId/typing', 'ChatController.setTyping')
Route.get('/api/chat/:chatId/info', 'ChatController.fetchChatInfo')
Route.get('/api/chat/users/blocked', 'ChatController.fetchBlockedUsers')
Route.post('/api/chat/users/blocked', 'ChatController.blockUser')
Route.delete('/api/chat/users/blocked/:blockedUserId', 'ChatController.unblockUser')
Route.get('/api/chat/:chatId/links/', 'ChatController.fetchLinks')
Route.get('/api/chat-link/:uuid', 'ChatController.fetchLink')
Route.put('/api/chat/:chatId/links/:uuid', 'ChatController.updateLink')
Route.get('/api/chat/:chatId/entryLogs', 'ChatController.fetchEntryLogs')
Route.post('/api/chat/game/:gameId', 'ChatController.acceptGameGroupInvitation')
Route.put('/api/user_chat/publicKey/', 'UserChatController.storePublicKey')
Route.post('/api/user_chat/encryption_email/', 'UserChatController.sendEncryptionEmail')
Route.get('/api/user_chat/game/', 'UserChatController.fetchGames')
Route.put('/api/user_chat/game/:gameId', 'UserChatController.favoriteGame')
Route.delete('/api/user_chat/game/:gameId', 'UserChatController.unfavoriteGame')
Route.put('/api/user_chat/game/:gameId/icon', 'UserChatController.updateGameIcon')
Route.get('/api/user_chat/contact/', 'UserChatController.fetchContacts')
Route.get('/api/user_chat/contact/:contactId', 'UserChatController.fetchContact')
Route.get('/api/user_chat/search/', 'UserChatController.searchUsers')
Route.get('/api/user_chat/status/', 'UserChatController.fetchStatus')
Route.put('/api/user_chat/status/', 'UserChatController.updateStatus')
Route.get('/api/game/', 'GameController.searchGames')

// Guests
Route.post('/api/guest/', 'GuestController.register')
Route.delete('/api/guest/:guestId/chat/:chatId', 'GuestController.unregister')
Route.get('/api/guest/link/:uuid', 'GuestController.fetchLink')
Route.get('/api/guest/chat/:chatId', 'GuestController.fetchChat')
Route.get('/api/guest/chat/:chatId/message', 'GuestController.fetchMessages')
Route.get('/api/guest/:guestId/chat/:chatId/message/encryption', 'GuestController.fetchEncryptionMessages')
Route.post('/api/guest/:guestId/chat/:chatId', 'GuestController.sendMessage')
Route.get('/api/guest/chat/:chatId/entryLogs', 'GuestController.fetchEntryLogs')
Route.get('/api/guest/privateKey/:chatId', 'GuestController.fetchGroupPrivateKeyRequests')
Route.post('/api/guest/privateKey/:userId/:chatId', 'GuestController.requestGroupPrivateKey')
Route.delete('/api/guest/privateKey/:userId/:chatId', 'GuestController.confirmGroupPrivateKey')

Route.any('*', ({ view }) => view.render('pages/react'))
