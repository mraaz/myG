const ASSETS_PATH = 'https://myG.gg/platform_icons/'

const assets = {
  background_guest: 'guest_background.jpg',

  sound_notification: 'notification.mp3',

  ic_chat_action_emoji: 'ic_chat_action_emoji.svg',
  ic_chat_action_image: 'ic_chat_action_image.svg',
  ic_chat_action_sound: 'ic_chat_action_sound.svg',
  ic_chat_action_video: 'ic_chat_action_video.svg',
  ic_chat_attach: 'ic_chat_attach.svg',
  ic_chat_block: 'ic_chat_block.svg',
  ic_chat_close: 'ic_chat_close.svg',
  ic_chat_delete: 'ic_chat_delete.svg',
  ic_chat_edit: 'ic_chat_edit.svg',
  ic_chat_group_create: 'ic_chat_group_create.svg',
  ic_chat_group_edit: 'ic_chat_group_edit.svg',
  ic_chat_group_exit: 'ic_chat_group_exit.svg',
  ic_chat_group_icon: 'ic_chat_group_icon.svg',
  ic_chat_group_invite: 'ic_chat_group_invite.svg',
  ic_chat_group_member: 'ic_chat_group_member.png',
  ic_chat_group_members: 'ic_chat_group_members.svg',
  ic_chat_group_moderator: 'ic_chat_group_moderator.png',
  ic_chat_group_moderator: 'ic_chat_group_moderator.svg',
  ic_chat_group_muted: 'ic_chat_group_muted.png',
  ic_chat_group_not_moderator: 'ic_chat_group_not_moderator.svg',
  ic_chat_group_owner: 'ic_chat_group_owner.png',
  ic_chat_group_remove: 'ic_chat_group_remove.png',
  ic_chat_group_remove: 'ic_chat_group_remove.svg',
  ic_chat_group_unmuted: 'ic_chat_group_unmuted.png',
  ic_chat_maximise: 'ic_chat_maximise.svg',
  ic_chat_minimise: 'ic_chat_minimise.svg',
  ic_chat_mute: 'ic_chat_mute.svg',
  ic_chat_options: 'ic_chat_options.svg',
  ic_chat_pause: 'ic_chat_pause.svg',
  ic_chat_play: 'ic_chat_play.svg',
  ic_chat_profile: 'ic_chat_profile.svg',
  ic_chat_self_destruct: 'ic_chat_self_destruct.svg',
  ic_chat_send: 'ic_chat_send.svg',
  ic_chat_settings: 'ic_chat_settings.svg',
  ic_guest_icon: 'ic_guest_icon.svg',
  ic_messenger_chevron_down: 'ic_messenger_chevron_down.svg',
  ic_messenger_chevron_right: 'ic_messenger_chevron_right.svg',
  ic_messenger_search: 'ic_messenger_search.svg',
  ic_messenger_settings: 'ic_messenger_settings.svg',
  ic_sweet_alert_info: 'ic_sweet_alert_info.svg',
  ic_sweet_alert_danger: 'ic_sweet_alert_danger.svg',
  ic_sweet_alert_warning: 'ic_sweet_alert_warning.svg',
  ic_sweet_alert_success: 'ic_sweet_alert_success.svg',
  ic_reaction_1: 'ic_reaction_1.png',
  ic_reaction_2: 'ic_reaction_2.png',
  ic_reaction_3: 'ic_reaction_3.png',
  ic_reaction_4: 'ic_reaction_4.png',
  ic_reaction_5: 'ic_reaction_5.png',
  ic_reaction_6: 'ic_reaction_6.png',

  ic_profile_add: 'ic_profile_add.svg',
  ic_profile_close: 'ic_profile_close.svg',
  ic_profile_settings: 'ic_profile_settings.svg',
  ic_profile_chevron_left: 'ic_profile_chevron_left.svg',
  ic_profile_chevron_right: 'ic_profile_chevron_right.svg',
  ic_profile_main_info: 'ic_profile_main_info.svg',
  ic_profile_experience: 'ic_profile_experience.svg',
  ic_profile_link: 'ic_profile_link.svg',
  ic_profile_link_gray: 'ic_profile_link_gray.svg',

  ic_youtube_white: 'ic_youtube_white.svg',
  ic_facebook_white: 'ic_facebook_white.svg',
  ic_steam_white: 'ic_steam_white.svg',
  ic_twitch_white: 'ic_twitch_white.svg',
  ic_discord_white: 'ic_discord_white.svg',

  ic_rating_very_sad: 'ic_rating_very_sad.svg',
  ic_rating_sad: 'ic_rating_sad.svg',
  ic_rating_neutral: 'ic_rating_neutral.svg',
  ic_rating_happy: 'ic_rating_happy.svg',
  ic_rating_very_happy: 'ic_rating_very_happy.svg',

}

export function getAssetUrl(asset) {
  return ASSETS_PATH + assets[asset]
}
