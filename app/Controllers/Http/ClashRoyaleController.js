'use strict'

const ClashRoyaleReminder = use('App/Models/ClashRoyaleReminder')
const ClashRoyalePlayers = use('App/Models/ClashRoyalePlayers')
const Database = use('Database')

const CommonController = use('./CommonController')

const LoggingRepository = require('../../Repositories/Logging')
const axios = use('axios')

const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjE4ZjYzOWEwLTg4MzAtNGFkYy1iNjRjLTYwMzg4NDIyNTQ4MCIsImlhdCI6MTYzMzAwMzUyMiwic3ViIjoiZGV2ZWxvcGVyL2U0ZjA1ZjI4LWJmOGMtNDJmNS0yY2I1LTU0ZTZlNjA2N2QxMiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMDEuMTE1LjEzNi4yNDgiXSwidHlwZSI6ImNsaWVudCJ9XX0.lUuxPHW0CAM0rlwLEokoC7KKtoZtu5AFiCAnSKQQIXpC0rukg91Pg5-ZoiMMHASVRYkac9_8WFiwVEJTqyo8DQ'
const CONFIG = {
  headers: { Authorization: `Bearer ${TOKEN}` }
}

class ClashRoyaleController {
  async show({ auth, request, response }) {
    // periodType: "training"
    // periodType: "warDay"
    // periodType: "colosseum"

    console.log('CLEAR')

    // const getClanInfo = await axios.post('https://hooks.slack.com/services/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', {
    //   payload: JSON.stringify({
    //     channel: '#myg-alerts',
    //     text: 'This is posted to #myg-alerts and comes from a bot named webhookbot.'
    //   })
    // })

    const data = 'Hello World ! '
    const payload = {
      username: 'myG_webApp',
      attachments: [{ text: data, color: 'green' }]
    }
    const options = {
      icon_emoji: slackBotIconEmoji,
      method: 'post',
      baseURL: 'https://hooks.slack.com/services/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',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: payload
    }
    const try_post = await axios.request(options)
    console.log(try_post)

    return

    try {
      if (request.params.clanTag == undefined || request.params.clanTag == '') {
        return 'Invalid Clan Tag'
      }

      const strClanTag = request.params.clanTag
      const clanTag = strClanTag.replace(/#/g, '').trim()

      const getClanURL = 'clans/' + '%23' + clanTag + '/members'
      //const getRiverRaceLogURL = 'clans/' + '%23' + clanTag + '/riverracelog'
      const getCurrentriverraceURL = 'clans/' + '%23' + clanTag + '/currentriverrace'

      const getClanInfo = await axios.get(`https://api.clashroyale.com/v1/${getClanURL}`, CONFIG)
      const getCurrentriverraceInfo = await axios.get(`https://api.clashroyale.com/v1/${getCurrentriverraceURL}`, CONFIG)
      //const getRiverRaceLogInfo = await axios.get(`https://api.clashroyale.com/v1/${getRiverRaceLogURL}`, CONFIG)

      const isWarToday = getCurrentriverraceInfo.data.periodType == 'training' ? false : true
      let riverRaceStruct = {}

      if (isWarToday) {
        for (let index = 0; index < getCurrentriverraceInfo.data.clan.participants.length; index++) {
          let playerRiverDetails = {
            decksUsed: getCurrentriverraceInfo.data.clan.participants[index].decksUsed,
            decksUsedToday: getCurrentriverraceInfo.data.clan.participants[index].decksUsedToday,
            fame: getCurrentriverraceInfo.data.clan.participants[index].fame,
            repairPoints: getCurrentriverraceInfo.data.clan.participants[index].repairPoints,
            boatAttacks: getCurrentriverraceInfo.data.clan.participants[index].boatAttacks
          }

          riverRaceStruct[getCurrentriverraceInfo.data.clan.participants[index].tag] = playerRiverDetails
        }
      }
      const get_clan = await Database.from('clash_royale_players').where({
        clan_tag: clanTag
      })

      let myGUsers = {}
      for (let index = 0; index < get_clan.length; index++) {
        myGUsers[get_clan[index].player_tag] = get_clan[index].user_id
      }

      for (let index = 0; index < getClanInfo.data.items.length; index++) {
        const player_tag_without_hash = getClanInfo.data.items[index].tag.substring(1)

        if (isWarToday) {
          getClanInfo.data.items[index].decksUsed = riverRaceStruct[getClanInfo.data.items[index].tag].decksUsed
          getClanInfo.data.items[index].decksUsedToday = riverRaceStruct[getClanInfo.data.items[index].tag].decksUsedToday
          getClanInfo.data.items[index].fame = riverRaceStruct[getClanInfo.data.items[index].tag].fame
          getClanInfo.data.items[index].repairPoints = riverRaceStruct[getClanInfo.data.items[index].tag].repairPoints
          getClanInfo.data.items[index].boatAttacks = riverRaceStruct[getClanInfo.data.items[index].tag].boatAttacks
          getClanInfo.data.items[index].myG_user_id = myGUsers[player_tag_without_hash]
        } else {
          getClanInfo.data.items[index].decksUsed = 0
          getClanInfo.data.items[index].decksUsedToday = 0
          getClanInfo.data.items[index].myG_user_id = myGUsers[player_tag_without_hash]
        }
      }

      //return getCurrentriverraceInfo.data
      return getClanInfo.data
    } catch (error) {
      if (error.response.data.reason == 'notFound') {
        return 'Clan not found'
      }
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
        method: 'show'
      })
    }
  }

  async storePlayerDetails({ auth, request, response }) {
    if (auth.user) {
      try {
        // const clanTag = '2R9PCGC'
        // const getPlayerURL = 'players/' + '%23' + clanTag

        // const getPlayerInfo = await axios.get(`https://api.clashroyale.com/v1/${getPlayerURL}`, CONFIG)

        if (request.input('clash_royale_players_id') != undefined) {
          await Database.table('clash_royale_players')
            .where({
              id: request.input('clash_royale_players_id')
            })
            .delete()
        }

        const get_player = await Database.from('clash_royale_players')
          .where({
            player_tag: request.input('player_tag')
          })
          .first()

        if (get_player != undefined) return

        if (request.input('group_id') == undefined || request.input('group_id') == '') return

        const commonController = new CommonController()
        const current_user_permission = await commonController.get_permission({ auth }, request.input('group_id'))

        //Allow Admins to set multiple myG Accounts to player tags
        if (current_user_permission != 0 && current_user_permission != 1) {
          await Database.table('clash_royale_players').where({ user_id: auth.user.id }).delete()
        }

        const cr_trans_id = await ClashRoyalePlayers.create({
          group_id: request.input('group_id'),
          clan_tag: request.input('clanTag'),
          player_tag: request.input('player_tag'),
          user_id: request.input('user_id')
        })

        if (request.input('reminder_one') != undefined) {
          await ClashRoyaleReminder.create({
            clash_royale_players_id: cr_trans_id.id,
            user_id: request.input('user_id'),
            reminder_time: request.input('reminder_one')
          })
        }

        if (request.input('reminder_two') != undefined) {
          await ClashRoyaleReminder.create({
            clash_royale_players_id: cr_trans_id.id,
            user_id: request.input('user_id'),
            reminder_time: request.input('reminder_two')
          })
        }

        if (request.input('reminder_three') != undefined) {
          await ClashRoyaleReminder.create({
            clash_royale_players_id: cr_trans_id.id,
            user_id: request.input('user_id'),
            reminder_time: request.input('reminder_three')
          })
        }

        return 'Saved successfully'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
          method: 'storePlayerDetails'
        })
      }
    }
  }
  async getPlayerDetails({ request }) {
    try {
      const playerDetails = Database.from('clash_royale_players')
        .leftJoin('clash_royale_reminders', 'clash_royale_reminders.clash_royale_players_id', 'clash_royale_players.id')
        .where('clash_royale_players.group_id', '=', request.input('group_id'))
        .andWhere('clash_royale_players.player_tag', '=', request.input('player_tag'))
        .select('clash_royale_players.*', 'clash_royale_reminders.reminder_time')
        .options({ nestTables: true })

      return playerDetails
    } catch (error) {
      if (error.response.data.reason == 'notFound') {
        return 'Clan not found'
      }
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
        method: 'getPlayerDetails'
      })
    }
  }

  async deletePlayerDetails({ request }) {
    try {
      await Database.table('clash_royale_players')
        .where({
          id: request.params.clash_royale_player_id
        })
        .delete()
    } catch (error) {
      if (error.response.data.reason == 'notFound') {
        return 'Clan not found'
      }
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
        method: 'deletePlayerDetails'
      })
    }
  }
}

module.exports = ClashRoyaleController
