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
Route.get('/terms', 'PageController.terms_of_use')
Route.get('/privacy_policy', 'PageController.privacy_policy')
Route.get('/gamers_code', 'PageController.gamers_code')

//Authentication
//Route.get('/register', 'AuthController.register')
Route.post('/register', 'AuthController.storeUser')
Route.get('/login', 'AuthController.login')
Route.post('/login', 'AuthController.loginUser')
//Route.get('/forgot-password', 'AuthController.forgotPassword')
Route.get('/logout', 'AuthController.logout')
//Route.get('/changepwd', 'AuthController.changepwd')
//Route.post('/changepwd', 'AuthController.updatepwd')

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

Route.get('/api/post/:counter', 'PostController.show')
Route.get('/api/mypost/:id', 'PostController.myshow')
Route.get('/api/getmypost/:paginateNo', 'PostController.showmyposts')
Route.get('/api/getuserposts/:userId/:paginateNo', 'PostController.postsFromUser')
Route.post('/api/post', 'PostController.store')
Route.get('/api/post/my_count/:id', 'PostController.posts_count')
Route.delete('/api/post/delete/:id', 'PostController.destroy')
Route.post('/api/post/update/:id', 'PostController.update')
Route.get('/api/getpost/:id', 'PostController.showpost')
Route.post('/api/post/featureToggle/', 'PostController.featureToggle')
Route.post('/api/post/showHashTagPosts/', 'PostController.showHashTagPosts')

Route.post('/api/sponsoredPost/update_clicks/', 'SponsoredPostController.update_clicks')

Route.post('/api/get_group_posts', 'PostController.get_group_posts')

Route.post('/api/user', 'UserController.store')
Route.post('/api/userprofile', 'UserController.changeProfile')
Route.post('/api/userprofilebg', 'UserController.changeProfileBg')
Route.get('/api/user/delete', 'UserController.destroy')
Route.get('/api/user/:id', 'UserController.profile')
Route.get('/api/user/getProfile/:alias', 'UserController.profile_with_alias')
Route.get('/api/user/alias/:alias', 'UserController.convertAliastoID')
Route.get('/api/user/:id/addFriend', 'UserController.addFriend')
Route.get('/api/user/:id/unfriend', 'UserController.unfriend')
Route.get('/api/user/:id/cancelFriendRequest', 'UserController.cancelFriendRequest')
Route.post('/api/user/playerSearchResults', 'UserController.playerSearchResults')
Route.post('/api/user/keywordSearchResults', 'UserController.keywordSearchResults')
Route.put('/api/user/notification_sounds', 'UserController.toggleNotificationSounds')
Route.put('/api/user/auto_self_destruct', 'UserController.toggleAutoSelfDestruct')

Route.get('/api/users_additional_infos/', 'UsersAdditionalInfoController.process_ip')

Route.post('/api/GameExperiences/commend/:game_exp_id', 'GameExperienceController.updateCommend')
Route.get('/api/GameExperiences/exp/:id', 'GameExperienceController.myShow')
Route.get('/api/GameExperiences/:id', 'GameExperienceController.show')
Route.post('/api/GameExperiences', 'GameExperienceController.store')
Route.get('/api/GameExperiences/delete/:game_id', 'GameExperienceController.destroy')
Route.post('/api/GameExperiences/:id/:game_id', 'GameExperienceController.update')
Route.get('/api/GameExperiences/:id/:game_id', 'GameExperienceController.show_Game')
Route.post('/api/GameExperiences/gameExpSearchResults', 'GameExperienceController.gameExpSearchResults')

Route.get('/api/ScheduleGame/additional_game_info/:id', 'ScheduleGameController.additional_game_info')

Route.post('/api/ScheduleGame', 'ScheduleGameController.store')
Route.delete('/api/ScheduleGame/delete/:id/:reason', 'ScheduleGameController.destroy')
//Route.get('/api/ScheduleGame', 'ScheduleGameController.show')
//Route.get('/api/ScheduleGame/:id', 'ScheduleGameController.show_one')
Route.post('/api/ScheduleGame/getAdmin', 'ScheduleGameController.getAdmin')

Route.get('/api/ArchiveScheduleGame/:id', 'Archive_ScheduleGameController.show_one')
Route.get('/api/ArchiveScheduleGame/filtered_by_one/:id', 'Archive_ScheduleGameController.filtered_by_one')

Route.post('/api/ScheduleGame/scheduleSearchResults', 'ScheduleGameController.scheduleSearchResults')

Route.get('/api/ScheduleGame/filtered_by_one/:schedule_games_GUID', 'ScheduleGameController.filtered_by_one')

Route.get('/api/myScheduledGames/:limitstr/:exclude_expired', 'ScheduleGameController.myScheduledGames')
Route.post('/api/myScheduledGames', 'ScheduleGameController.myScheduledGames')
Route.get('/api/myScheduledGamesCount/:id', 'ScheduleGameController.myScheduledGamesCount')

Route.post('/api/ScheduleGame/myScheduledGames_Upcoming_Games/', 'ScheduleGameController.myScheduledGames_Upcoming_Games')

Route.get('/api/ScheduleGame/getHeader_ALL/:game_names_id', 'ScheduleGameController.getHeader_ALL')
Route.get('/api/ScheduleGame/edit_game/:id', 'ScheduleGameController.edit_game')
Route.post('/api/ScheduleGame/update', 'ScheduleGameController.update')

Route.get('/api/ArchivemyScheduledGamesCount/:id', 'Archive_ScheduleGameController.myScheduledGamesCount')

Route.get('/api/GameNames', 'GameNameController.show')
Route.get('/api/GameName/:name', 'GameNameController.show_one')
Route.post('/api/GameNames', 'GameNameController.store')
Route.get('/api/GameNames/:int/gameSearchResults', 'GameNameController.gameSearchResults')
Route.get('/api/GameNames/getTopGames', 'GameNameController.getTopGames')

Route.get('/api/Tags', 'TagController.show')
Route.post('/api/Tags/getTagsforGames', 'TagController.getTagsforGames')
Route.post('/api/Tags/getTopTagsforGames', 'TagController.getTopTagsforGames')
Route.post('/api/Tags', 'TagController.store')

Route.get('/api/GameTags/getTopGameTags', 'GameTagController.getTopGameTags')
Route.post('/api/GameTags/getGameTags', 'GameTagController.getGameTags')

Route.get('/api/GameSkills/getTopGameSkills', 'GameSkillController.getTopGameSkills')
Route.post('/api/GameSkills/getGameSkills', 'GameSkillController.getGameSkills')

Route.post('/api/HashTags', 'HashTagController.store')
Route.get('/api/HashTags/getTopHashTags', 'HashTagController.getTopHashTags')
Route.post('/api/HashTags/getHashTags', 'HashTagController.getHashTags')

Route.post('/api/likes/', 'LikeController.store')
Route.get('/api/likes/:id', 'LikeController.show')
Route.get('/api/likes/comment/:id', 'LikeController.show_comments')
Route.get('/api/likes/reply/:id', 'LikeController.show_replies')
Route.get('/api/likes/delete/:id', 'LikeController.destroy')
Route.get('/api/likes/delete/comment/:id', 'LikeController.destroy_comment')

Route.get('/api/likes/delete/reply/:id', 'LikeController.destroy_reply')
Route.get('/api/thisLike/:id', 'LikeController.getthisLike')

Route.delete('/api/comments/delete/:id', 'CommentController.destroy')
Route.get('/api/comments/:id', 'CommentController.show')
Route.post('/api/comments/', 'CommentController.store')
Route.get('/api/comments/my_count/:id', 'CommentController.comments_count')
Route.get('/api/comments/show_comment/:id', 'CommentController.show_comment')
Route.post('/api/comments/update/:id', 'CommentController.update')
Route.get('/api/comments/scheduled_games/:id', 'CommentController.show_scheduled_games')
Route.get('/api/comments/scheduled_gamesCount/:id', 'CommentController.show_scheduled_gamesCount')
Route.get('/api/comments/get_right_card_comment_info/:id', 'CommentController.get_right_card_comment_info')

Route.get('/api/archive_comments/scheduled_gamesCount/:id', 'Archive_CommentController.show_scheduled_gamesCount')
Route.get('/api/archive_comments/scheduled_games/:id', 'Archive_CommentController.show_scheduled_games')

Route.delete('/api/replies/delete/:id', 'ReplyController.destroy')
Route.get('/api/replies/:id', 'ReplyController.show')
Route.post('/api/replies/update/:id', 'ReplyController.update')
Route.get('/api/replies/show_reply/:id', 'ReplyController.show_reply')
Route.get('/api/replies/my_count/:id', 'ReplyController.replies_count')
Route.post('/api/replies/', 'ReplyController.store')

Route.get('/api/notifications/getAllNotiLike_post/:id', 'NotificationController.getAllNotiLike_post')
Route.get('/api/notifications/getAllNotiLike_comment/:id', 'NotificationController.getAllNotiLike_comment')
Route.get('/api/notifications/getAllNotiLike_reply/:id', 'NotificationController.getAllNotiLike_reply')
Route.get('/api/notifications/getAllNotiComment/:id', 'NotificationController.getAllNotiComment')
Route.get('/api/notifications/getAllNotiReply/:id', 'NotificationController.getAllNotiReply')
Route.get('/api/notifications/outgoingFriendRequests', 'NotificationController.outgoingFriendRequests')

Route.post('/api/notifications/updateRead_Status/:post_id/:activity_type', 'NotificationController.updateRead_Status')

Route.get('/api/notifications/getunread/:post_id/:activity_type', 'NotificationController.getRead_Status')
Route.get(
  '/api/notifications/getunread_schedule_game/:schedule_game_id/:activity_type',
  'NotificationController.getRead_Status_schedule_game'
)
Route.get(
  '/api/notifications/getunread_archive_schedule_game/:archive_schedule_game_id/:activity_type',
  'NotificationController.getunread_archive_schedule_game'
)
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
Route.get('/api/notifications/myRequests/', 'NotificationController.myRequests')
Route.post('/api/notifications/addGroup', 'NotificationController.addGroup')
Route.post('/api/notifications/add_all_to_Group', 'NotificationController.add_all_to_Group')
Route.post('/api/notifications/add_vip_to_Group', 'NotificationController.add_vip_to_Group')
Route.get('/api/notifications/delete_group/:id', 'NotificationController.delete_group')
Route.get('/api/notifications/getunread_group/:id/:activity_type', 'NotificationController.getunread_group')
Route.post('/api/notifications/addGameApproved', 'NotificationController.addGameApproved')
Route.put('/api/notifications/inviteToGroup', 'NotificationController.inviteToGroup')
Route.get('/api/notifications/getunread_dings', 'NotificationController.getunread_dings')

//-----------------------------------------
Route.get('/api/notifications_v2/count', 'NotificationController_v2.count')
Route.post('/api/notifications_v2/getApprovals_Dashboard', 'NotificationController_v2.getApprovals_Dashboard')
Route.delete('/api/notifications_v2/delete/:id', 'NotificationController_v2.destroy')
Route.delete('/api/notifications_v2/delete_community/:id/:group_id/:user_id', 'NotificationController_v2.destroy_community')
Route.post('/api/notifications_v2/getAllNoti', 'NotificationController_v2.getAllNotifications')
Route.get('/api/notifications_v2/markAllNoti', 'NotificationController_v2.markAllNoti')
Route.get('/api/notifications_v2/deleteAllNoti', 'NotificationController_v2.deleteAllNoti')
Route.post('/api/notifications_v2/addFriend', 'NotificationController_v2.addFriend')
Route.get('/api/notifications_v2/friend/:id', 'NotificationController_v2.checkFriend')
Route.post('/api/notifications_v2/invitations', 'NotificationController_v2.invitations')
Route.post('/api/notifications_v2/invitations_community', 'NotificationController_v2.invitations_community')
Route.post('/api/notifications_v2/mark_read_status', 'NotificationController_v2.mark_read_status')
Route.post('/api/notifications_v2/getUnread_count', 'NotificationController_v2.getUnread_count')
Route.get('/api/notifications_v2/getCheck', 'NotificationController_v2.getCheck')
//-----------------------------------------

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
Route.get('/api/attendees/game_positions/:id', 'AttendeeController.show_game_positions')
Route.get('/api/attendees/getScheduleGameInvites/:id', 'AttendeeController.getScheduleGameInvites')
Route.get('/api/attendees/delete_myInvite/:schedule_game_id/:id', 'AttendeeController.delete_invite')
Route.post('/api/attendees/role_call_ALL', 'AttendeeController.role_call_ALL')
Route.post('/api/attendees/update_invite', 'AttendeeController.up_invite')
Route.get('/api/attendees/getHeader/:id', 'AttendeeController.getHeader')

Route.get('/api/archive_attendees/attending/:id', 'Archive_AttendeeController.show_attending')
Route.get('/api/archive_attendees/role_call/:id', 'Archive_AttendeeController.role_call')
Route.get('/api/archive_attendees/role_call_ALL/:id', 'Archive_AttendeeController.role_call_ALL')

Route.post('/api/groups/create', 'GroupController.store')
Route.get('/api/groups/getGroupDetails/:name', 'GroupController.getGroupDetails')
Route.get('/api/groups/:str/groupSearchResults', 'GroupController.groupSearchResults')
Route.get('/api/groups/:str/groupSearchResults_Post', 'GroupController.groupSearchResults_Post')
Route.get('/api/groups/:str/groupSearchResults_notMygrps', 'GroupController.groupSearchResults_notMygrps')
Route.get('/api/groups/groupName/:group_name', 'GroupController.groupName')

Route.get('/api/groups/view/:counter', 'GroupController.myshow')
//Route.get('/api/groups/all_myGrps/:counter', 'GroupController.all_myGrps')

Route.post('/api/groups/update_img', 'GroupController.update_img')
Route.post('/api/groups/update_settings/', 'GroupController.update_settings')
Route.get('/api/groups/show_owner/:id', 'GroupController.show_owner')
Route.get('/api/groups/:id', 'GroupController.show')

Route.post('/api/groups/delete', 'GroupController.destroy')

Route.post('/api/groups/update_name', 'GroupController.update_name')

Route.get('/api/groups/get_my_communities/:counter', 'GroupController.get_my_communities')

Route.post('/api/groups/groupInvites', 'GroupController.groupInvites')

Route.get('/api/usergroup/get_all_my_group_approvals/:group_id', 'UsergroupController.get_all_my_group_approvals')
Route.post('/api/usergroup/create', 'UsergroupController.store')
Route.get('/api/usergroup/view/:counter', 'UsergroupController.myshow')
Route.get('/api/usergroup/:id', 'UsergroupController.show')
Route.get('/api/usergroup/mygroup_details/:group_id', 'UsergroupController.mygroup_details')
Route.delete('/api/usergroup/:group_id', 'UsergroupController.destroy')
Route.get('/api/usergroup/set_group_approval/:grp_id/:user_id', 'UsergroupController.set_group_approval')
Route.get('/api/usergroup/remove_group_approval/:group_id/:usergrp_id', 'UsergroupController.remove_group_approval')
Route.post('/api/usergroup/member_lists/', 'UsergroupController.member_lists')
Route.delete('/api/usergroup/delete_member/:group_id/:usergrp_id', 'UsergroupController.delete_member')
Route.get('/api/usergroup/promote_member_cycle/:group_id/:usergrp_id', 'UsergroupController.promote_member_cycle')

Route.post('/api/usergroup/usergroupSearchResults/', 'UsergroupController.usergroupSearchResults')

Route.get('/api/usergroup/current_member/:group_id', 'UsergroupController.current_member')

Route.post('/api/followers/create', 'FollowerController.store')
Route.delete('/api/followers/:follower_id/delete', 'FollowerController.delete')
Route.delete('/api/followers/:follower_id/delete_group', 'FollowerController.delete_group')

Route.get('/api/email/welcome_email', 'EmailController.welcome_email')

Route.post('/api/connections/gamers_you_might_know', 'ConnectionController.gamers_you_might_know')
Route.get('/api/connections/i_am_viewing_this_profile/:other_user_id', 'ConnectionController.have_I_viewed_this_profile')
Route.post('/api/connections/communities_you_might_know', 'ConnectionController.communities_you_might_know')

Route.post('/api/invited_users_for_schedule_games/create', 'InvitedUsersForScheduleGameController.store')
Route.post('/api/invited_users_for_schedule_games/invite', 'InvitedUsersForScheduleGameController.invite')

Route.get('/api/userStatTransaction/mostImprovedGamer', 'UserStatTransactionController.getMostImprovedGamer')
Route.get('/api/userStatTransaction/master_controller', 'UserStatTransactionController.master_controller')
Route.post('/api/userStatTransaction/checkedLevel', 'UserStatTransactionController.checkedLevel')

Route.post('/api/userStatTransaction/login_sync', 'UserStatTransactionController.login_sync')

Route.post('/api/SavedFiltersScheduleGameController', 'SavedFiltersScheduleGameController.store')
Route.post('/api/SavedFiltersScheduleGameController/updateFilter', 'SavedFiltersScheduleGameController.updateFilter')
Route.post('/api/SavedFiltersScheduleGameController/deleteFilter', 'SavedFiltersScheduleGameController.destroy')
Route.get('/api/SavedFiltersScheduleGameController/getAllSavedFilters', 'SavedFiltersScheduleGameController.getAllSavedFilters')

// Logging
Route.post('/api/logging', 'LoggingController.log')

// Aws Key Upload
Route.post('/api/chat/:chatId/icon', 'AwsKeyController.addChatGroupProfileKey')
Route.post('/api/chat/:chatId/message/:messageId/icon', 'AwsKeyController.addChatAttachmentKey')
Route.post('/api/game/:gameId/icon', 'AwsKeyController.addGameIconKey')

// Chat Feature - https://docs.google.com/spreadsheets/d/1AR9P3MLQw6J6eoRqgTbOVROFxmPE215yXzsqD59wy2o
Route.get('/api/messenger/', 'ChatController.prepareMessenger')
Route.get('/api/chat/', 'ChatController.fetchChats')
Route.get('/api/chat/:chatId', 'ChatController.fetchChat')
Route.get('/api/chat_by_game/:requestedGameId', 'ChatController.fetchChatByIndividualGameId')
Route.post('/api/chat/', 'ChatController.createChat')
Route.put('/api/chat/:chatId', 'ChatController.updateChat')
Route.delete('/api/chat/:chatId', 'ChatController.clearChat')
Route.delete('/api/chat/:chatId/destruction', 'ChatController.checkChatDestruction')
Route.delete('/api/chat/:chatId/delete', 'ChatController.deleteChat')
Route.delete('/api/chat/:chatId/forceDelete', 'ChatController.forceDeleteChat')
Route.delete('/api/chat/:chatId/exit', 'ChatController.exitGroup')
Route.delete('/api/chat/:chatId/exit/:userId', 'ChatController.removeFromGroup')
Route.get('/api/chat/:chatId/contacts', 'ChatController.fetchChatContacts')
Route.put('/api/chat/:chatId/contacts', 'ChatController.addContactsToChat')
Route.get('/api/chat/:chatId/message/', 'ChatController.fetchMessages')
Route.get('/api/chat/message/unread', 'ChatController.fetchUnreadMessages')
Route.get('/api/chat/:chatId/message/encryption', 'ChatController.fetchEncryptionMessages')
Route.get('/api/groups', 'ChatController.searchGroup')
Route.get('/api/chat_notifications', 'ChatController.fetchChatNotifications')
Route.put('/api/chat_notifications', 'ChatController.markChatNotificationAsRead')
Route.delete('/api/chat_notifications', 'ChatController.deleteChatNotifications')
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
Route.get('/api/user_chat/recent', 'ChatController.fetchRecentMessages')
Route.get('/api/user_chat/contact/', 'UserChatController.fetchContacts')
Route.get('/api/user_chat/contact/:contactId', 'UserChatController.fetchContact')
Route.get('/api/user_chat/search/', 'UserChatController.searchUsers')
Route.get('/api/user_chat/status/', 'UserChatController.fetchStatus')
Route.put('/api/user_chat/status/', 'UserChatController.updateStatus')
Route.get('/api/game/', 'GameController.searchGames')
Route.get('/api/user_settings', 'UserChatController.fetchSettings')
Route.post('/api/user_settings/push_notifications', 'UserChatController.togglePushNotifications')
Route.post('/api/encryption', 'UserChatController.sendEncryptionReminderEmail')
Route.get('/api/chat/paginated/contact', 'ChatController.fetchContactsPaginated')
Route.get('/api/chat/paginated/groups', 'ChatController.fetchGroupsPaginated')
Route.get('/api/chat/paginated/games', 'ChatController.fetchGamesPaginated')
Route.get('/api/chat/paginated/search', 'ChatController.searchPaginated')
Route.get('/api/chat/:chatId/privateKey', 'ChatController.fetchGroupPrivateKeyRequests')
Route.post('/api/chat/:chatId/privateKey', 'ChatController.requestGroupPrivateKey')
Route.delete('/api/chat/:chatId/privateKey', 'ChatController.confirmGroupPrivateKey')

// Channels
Route.get('/api/channel/:channelId', 'ChatController.fetchChannel')
Route.get('/api/users/online', 'UserController.fetchOnlineUsers')

// Guests
Route.post('/api/guest/', 'GuestController.register')
Route.delete('/api/guest/:guestId/chat/:chatId', 'GuestController.unregister')
Route.get('/api/guest/link/:uuid', 'GuestController.fetchLink')
Route.get('/api/guest/chat/:chatId', 'GuestController.fetchChat')
Route.get('/api/guest/chat/:chatId/message', 'GuestController.fetchMessages')
Route.get('/api/guest/:guestId/chat/:chatId/message/encryption', 'GuestController.fetchEncryptionMessages')
Route.post('/api/guest/:guestId/chat/:chatId/message', 'GuestController.sendMessage')
Route.put('/api/guest/:guestId/chat/:chatId/message/:messageId', 'GuestController.editMessage')
Route.delete('/api/guest/:guestId/chat/:chatId/message/:messageId', 'GuestController.deleteMessage')
Route.post('/api/guest/:guestId/chat/:chatId/message/:messageId/reaction', 'GuestController.addReaction')
Route.delete('/api/guest/:guestId/chat/:chatId/message/:messageId/reaction/:reactionId', 'GuestController.removeReaction')
Route.get('/api/guest/chat/:chatId/entryLogs', 'GuestController.fetchEntryLogs')
Route.get('/api/guest/chat/:chatId/contacts', 'GuestController.fetchChatContacts')
Route.get('/api/guest/privateKey/:chatId', 'GuestController.fetchGroupPrivateKeyRequests')
Route.post('/api/guest/privateKey/:guestId/:chatId', 'GuestController.requestGroupPrivateKey')
Route.delete('/api/guest/privateKey/:guestId/:chatId', 'GuestController.confirmGroupPrivateKey')
Route.post('/api/guest/lastRead/:guestId/:chatId', 'GuestController.markLastReadGuest')

// Seats Available
Route.get('/api/seats_available', 'SeatsAvailableController.fetchSeatsAvailable')
Route.get('/api/seats_available/:code', 'SeatsAvailableController.checkExtraSeatsCode')
Route.get('/api/seats_available_email/:email', 'SeatsAvailableController.storeSeatsAvailableEmail')

// Profile
Route.get('/api/profile/:alias', 'ProfileController.fetchProfileInfo')
Route.put('/api/profile/:alias', 'ProfileController.updateProfile')
Route.put('/api/profile/:alias/game', 'ProfileController.updateGame')
Route.get('/api/profile/:alias/friends', 'ProfileController.fetchFriends')
Route.delete('/api/game_experience/:gameExperienceId', 'ProfileController.deleteGameExperience')
Route.get('/api/gamer_suggestions', 'ProfileController.fetchGamerSuggestions')
Route.get('/api/profile_fields/:gameId', 'ProfileController.fetchDynamicFields')
Route.post('/api/commend/:alias/:gameExperienceId', 'ProfileController.commendUser')

// Advanced Search
Route.get('/api/search/gamers', 'SearchController.searchGamers')

//Sponsor
Route.post('/api/sponsor/create', 'SponsorController.store')
Route.delete('/api/sponsor/delete/:id', 'SponsorController.destroy')
Route.post('/api/sponsor/update', 'SponsorController.update')
Route.get('/api/sponsor/show_approval/:counter', 'SponsorController.show_approval')
Route.post('/api/sponsor/approval_for_sponsor', 'SponsorController.approval_for_sponsor')

//Reports
Route.post('/api/report/create', 'ReportController.store')
Route.delete('/api/report/delete/:id', 'ReportController.destroy')
Route.delete('/api/report/delete_source/:id', 'ReportController.destroy_source')
Route.get('/api/report/:counter', 'ReportController.show')

//Reported
Route.get('/api/reported/:counter', 'ReportedController.show')
Route.delete('/api/user/delete/:id', 'ReportedController.destroy')

// Onboarding
Route.get('/api/onboarding/', 'OnboardingController.getOnboardingStep')
Route.put('/api/onboarding/:step', 'OnboardingController.setOnboardingStep')

// Achievements
Route.get('/api/achievements/badges/:alias', 'AchievementsController.fetchBadges')
Route.post('/api/achievements/badges/:alias', 'AchievementsController.redeemBadge')
Route.post('/api/achievements/registerSponsorClick', 'AchievementsController.registerSponsorClick')
Route.post('/api/achievements/registerAccess', 'AchievementsController.registerAccess')
Route.get('/api/achievements/daily', 'AchievementsController.fetchDailyQuests')
Route.get('/api/achievements/weekly', 'AchievementsController.fetchWeeklyQuests')
Route.get('/api/achievements/monthly', 'AchievementsController.fetchMonthlyQuests')
Route.post('/api/achievements/daily', 'AchievementsController.redeemDaily')
Route.post('/api/achievements/weekly', 'AchievementsController.redeemWeekly')
Route.post('/api/achievements/monthly', 'AchievementsController.redeemMonthly')

// Triggering Jobs
Route.get('/api/schedule/:job', 'SchedulerController.triggerJob')

Route.any('*', ({ view }) => view.render('pages/react'))
