'use strict'

const ClashRoyaleReminder = use('App/Models/ClashRoyaleReminder')
const ClashRoyalePlayers = use('App/Models/ClashRoyalePlayers')
const Database = use('Database')

const CommonController = use('./CommonController')
const SlackController = use('./SlackController')
const AWSEmailController = use('./AWSEmailController')
const Email_body = use('./EmailBodyController')

const LoggingRepository = require('../../Repositories/Logging')
const EncryptionRepository = require('../../Repositories/Encryption')

const axios = use('axios')

//Decided to leave token in code, as each token is restricted to an IP
const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjEyNjQ5ZGU3LTNjMzMtNDM2Yy04ZTk0LWI4MDE0YjdlN2EwOCIsImlhdCI6MTYzNDYyOTI2MCwic3ViIjoiZGV2ZWxvcGVyL2I5OWJkYTY4LTdhYjktNTE0OS0wYTVkLWExYTdkZWNkYTg2MiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS4xMjcuMTM3LjEzNyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.3W0QynByezVyzY4TYdITV_KRi13_YM28CVwdmO5xXfCkQBIEOOPyDlfFOUopTKmCbYrMj7xhCvRVODLyxmkNIg'
const CONFIG = {
  headers: { Authorization: `Bearer ${TOKEN}` }
}

class ClashRoyaleController {
  async show({ auth, request, response }) {
    // periodType: "training"
    // periodType: "warDay"
    // periodType: "colosseum"
    let header = []

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
      const get_clan = await Database.from('clash_royale_players').innerJoin('users', 'users.id', 'clash_royale_players.user_id').where({
        clan_tag: clanTag
      })

      let myGUsers = {}
      for (let index = 0; index < get_clan.length; index++) {
        let tmpStruct = {
          user_id: get_clan[index].user_id,
          alias: get_clan[index].alias
        }
        myGUsers[get_clan[index].player_tag] = tmpStruct
      }

      let headerStruct = {}

      if (isWarToday) {
        headerStruct = {
          myG_alias: 'myG Alias',
          decksUsed: 'Total decks used',
          decksUsedToday: 'Total decks used today',
          fame: 'Fame',
          repairPoints: 'Repair Points',
          boatAttacks: 'Boat Attacks'
        }
      } else {
        headerStruct = {
          myG_alias: 'myG Alias',
          decksUsed: 'Total decks used',
          decksUsedToday: 'Total decks used today'
        }
      }
      header.push(headerStruct)
      getClanInfo.data.header = header[0]

      for (let index = 0; index < getClanInfo.data.items.length; index++) {
        const player_tag_without_hash = getClanInfo.data.items[index].tag.substring(1)
        if (myGUsers[player_tag_without_hash] && myGUsers[player_tag_without_hash].user_id != undefined)
          getClanInfo.data.items[index].myG_user_id = myGUsers[player_tag_without_hash].user_id

        if (myGUsers[player_tag_without_hash] && myGUsers[player_tag_without_hash].alias != undefined)
          getClanInfo.data.items[index].myG_alias = myGUsers[player_tag_without_hash].alias

        if (isWarToday) {
          getClanInfo.data.items[index].decksUsed = riverRaceStruct[getClanInfo.data.items[index].tag].decksUsed
          getClanInfo.data.items[index].decksUsedToday = riverRaceStruct[getClanInfo.data.items[index].tag].decksUsedToday
          getClanInfo.data.items[index].fame = riverRaceStruct[getClanInfo.data.items[index].tag].fame
          getClanInfo.data.items[index].repairPoints = riverRaceStruct[getClanInfo.data.items[index].tag].repairPoints
          getClanInfo.data.items[index].boatAttacks = riverRaceStruct[getClanInfo.data.items[index].tag].boatAttacks
        } else {
          getClanInfo.data.items[index].decksUsed = 0
          getClanInfo.data.items[index].decksUsedToday = 0
        }
      }

      //return getCurrentriverraceInfo.data
      return getClanInfo.data
    } catch (error) {
      if (error.message == 'Request failed with  status code 404') {
        return 'Clan not found'
      }
      if (error.message == 'Request failed with status code 403') {
        const slack = new SlackController()
        slack.sendMessage('Clash Royale Auth Failed: Auth Token: ' + TOKEN)
        return 'Auth Error'
      }
      if (error.message == 'Request failed with status code 429') {
        const slack = new SlackController()
        slack.sendMessage('Clash Royale request was throttled! Auth Token: ' + TOKEN)
        return 'Throttled Error'
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

        if (request.input('group_id') == undefined || request.input('group_id') == '') return

        const get_player = await Database.from('clash_royale_players')
          .where({
            player_tag: request.input('player_tag'),
            group_id: request.input('group_id')
          })
          .first()

        if (get_player != undefined) return

        const commonController = new CommonController()
        const current_user_permission = await commonController.get_permission({ auth }, request.input('group_id'))

        //Allow Admins to set multiple myG Accounts to player tags
        // if (current_user_permission != 0 && current_user_permission != 1) {
        //   await Database.table('clash_royale_players').where({ user_id: auth.user.id }).delete()
        // }

        const get_player_deets = await Database.from('users')
          .where({ id: request.input('user_id') })
          .select('users.timeZone')
          .first()

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
            reminder_time: await this.converttoUTCHours(request.input('reminder_one'), get_player_deets.timeZone)
          })
        }

        if (request.input('reminder_two') != undefined) {
          await ClashRoyaleReminder.create({
            clash_royale_players_id: cr_trans_id.id,
            user_id: request.input('user_id'),
            reminder_time: this.converttoUTCHours(request.input('reminder_two'), get_player_deets.timeZone)
          })
        }

        if (request.input('reminder_three') != undefined) {
          await ClashRoyaleReminder.create({
            clash_royale_players_id: cr_trans_id.id,
            user_id: request.input('user_id'),
            reminder_time: this.converttoUTCHours(request.input('reminder_three'), get_player_deets.timeZone)
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
      const playerDetails = await Database.from('clash_royale_players')
        .leftJoin('clash_royale_reminders', 'clash_royale_reminders.clash_royale_players_id', 'clash_royale_players.id')
        .innerJoin('users', 'users.id', 'clash_royale_players.user_id')
        .where('clash_royale_players.group_id', '=', request.input('group_id'))
        .andWhere('clash_royale_players.player_tag', '=', request.input('player_tag'))
        .select('clash_royale_players.*', 'clash_royale_reminders.reminder_time', 'users.timeZone')
      //.options({ nestTables: true })

      switch (playerDetails.length) {
        case 1:
          playerDetails[0].reminder_time_1 = await this.converttoLocalHours(
            playerDetails[0].reminder_time.substr(playerDetails[0].reminder_time.length - 2),
            playerDetails[0].timeZone
          )
          playerDetails[0].regional = await EncryptionRepository.decryptField(playerDetails[0].regional)
          delete playerDetails[0].reminder_time
          break
        case 2:
          playerDetails[0].reminder_time_1 = await this.converttoLocalHours(
            playerDetails[0].reminder_time.substr(playerDetails[0].reminder_time.length - 2),
            playerDetails[0].timeZone
          )
          playerDetails[0].regional = await EncryptionRepository.decryptField(playerDetails[0].regional)
          delete playerDetails[0].reminder_time

          playerDetails[0].reminder_time_2 = await this.converttoLocalHours(
            playerDetails[1].reminder_time.substr(playerDetails[1].reminder_time.length - 2),
            playerDetails[1].timeZone
          )

          delete playerDetails[0].reminder_time
          delete playerDetails[1]

          break
        case 3:
          playerDetails[0].reminder_time_1 = await this.converttoLocalHours(
            playerDetails[0].reminder_time.substr(playerDetails[0].reminder_time.length - 2),
            playerDetails[0].timeZone
          )
          playerDetails[0].regional = await EncryptionRepository.decryptField(playerDetails[0].regional)
          delete playerDetails[0].reminder_time

          playerDetails[0].reminder_time_2 = await this.converttoLocalHours(
            playerDetails[1].reminder_time.substr(playerDetails[1].reminder_time.length - 2),
            playerDetails[1].timeZone
          )
          delete playerDetails[1]

          playerDetails[0].reminder_time_3 = await this.converttoLocalHours(
            playerDetails[2].reminder_time.substr(playerDetails[2].reminder_time.length - 2),
            playerDetails[2].timeZone
          )
          delete playerDetails[2]
          break
      }

      if (playerDetails.length) return playerDetails[0]
      else return playerDetails
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

  async converttoUTCHours(reminder_time_hours, time_zone) {
    try {
      let new_date = new Date()
      if (time_zone != 'GMT') new_date.toLocaleString('en-US', { timeZone: time_zone })

      new_date.setHours(reminder_time)
      return new_date.getUTCHours()
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
        method: 'converttoUTCHours'
      })
    }
  }

  async converttoLocalHours(reminder_time, time_zone) {
    try {
      let new_date = new Date(Date.UTC(1981, 3, 19, reminder_time, 0, 0))
      if (time_zone != 'GMT') new_date.toLocaleString('en-US', { timeZone: time_zone })
      return new_date.getHours()
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
        method: 'converttoUTCHours'
      })
    }
  }

  async reminder_service({ request }) {
    var curClanTag
    try {
      //Get time n extract the hour
      //Get a list of all clans that need reminding
      //Call the api for this clan
      //Get a list of players for this clan that need reminding
      //Send off email
      //Update DB

      let d = new Date()
      let curHour = d.getHours()

      //Only EMAIL if we have NOT sent you an email in the last 24 hours
      let today = new Date(),
        cutOff_date = new Date(today)

      cutOff_date.setMinutes(today.getMinutes() - 30)

      const reminderClans = await Database.from('clash_royale_players')
        .innerJoin('clash_royale_reminders', 'clash_royale_reminders.clash_royale_players_id', 'clash_royale_players.id')
        .where('clash_royale_reminders.reminder_time', '=', curHour)
        .andWhere('clash_royale_reminders.email_notification_last_runtime', '<', cutOff_date)
        .select('clash_royale_players.clan_tag')
        .groupBy('clash_royale_players.clan_tag')
        .distinct('clash_royale_players.clan_tag')

      for (let index = 0; index < reminderClans.length; index++) {
        curClanTag = reminderClans[index].clan_tag
        const getCurrentriverraceURL = 'clans/' + '%23' + curClanTag + '/currentriverrace'
        try {
          const getCurrentriverraceInfo = await axios.get(`https://api.clashroyale.com/v1/${getCurrentriverraceURL}`, CONFIG)

          const reminderPlayers = await Database.from('clash_royale_players')
            .innerJoin('clash_royale_reminders', 'clash_royale_reminders.clash_royale_players_id', 'clash_royale_players.id')
            .innerJoin('users', 'users.id', 'clash_royale_players.user_id')
            .where('clash_royale_reminders.reminder_time', '=', curHour)
            .andWhere('clash_royale_reminders.email_notification_last_runtime', '<', cutOff_date)
            .andWhere('clash_royale_players.clan_tag', '=', curClanTag)
            .select(
              'clash_royale_players.player_tag',
              'users.email',
              'clash_royale_reminders.number_of_wars_remaining',
              'clash_royale_reminders.id',
              'users.alias'
            )

          let riverRaceStruct = {}

          for (let index = 0; index < reminderPlayers.length; index++) {
            if (riverRaceStruct[reminderPlayers[index].player_tag] && riverRaceStruct[reminderPlayers[index].player_tag].sent == true)
              continue
            if (riverRaceStruct[reminderPlayers[index].player_tag] != undefined) {
              if (riverRaceStruct[reminderPlayers[index].player_tag].decksUsedToday != 4) {
                this.sendEmail(
                  await EncryptionRepository.decryptField(reminderPlayers[index].email),
                  riverRaceStruct[reminderPlayers[index].player_tag].decksUsedToday,
                  reminderPlayers[index].number_of_wars_remaining,
                  reminderPlayers[index].id,
                  reminderPlayers[index].alias
                )
              }

              riverRaceStruct[reminderPlayers[index].player_tag].sent = true
            } else {
              let elements_to_delete = []
              for (let innerindex = 0; innerindex < getCurrentriverraceInfo.data.clan.participants.length; innerindex++) {
                if (getCurrentriverraceInfo.data.clan.participants[innerindex].tag == '#' + reminderPlayers[index].player_tag) {
                  if (
                    riverRaceStruct[getCurrentriverraceInfo.data.clan.participants[innerindex].tag] &&
                    riverRaceStruct[getCurrentriverraceInfo.data.clan.participants[innerindex].tag].sent == true
                  ) {
                    break
                  }
                  if (getCurrentriverraceInfo.data.clan.participants[innerindex].decksUsedToday != 4) {
                    this.sendEmail(
                      await EncryptionRepository.decryptField(reminderPlayers[index].email),
                      getCurrentriverraceInfo.data.clan.participants[innerindex].decksUsedToday,
                      reminderPlayers[index].number_of_wars_remaining,
                      reminderPlayers[index].id,
                      reminderPlayers[index].alias
                    )
                  }
                  let playerRiverDetails = {
                    decksUsedToday: getCurrentriverraceInfo.data.clan.participants[innerindex].decksUsedToday,
                    sent: true
                  }
                  riverRaceStruct[getCurrentriverraceInfo.data.clan.participants[innerindex].tag] = playerRiverDetails

                  elements_to_delete.push(innerindex)
                  break
                } else {
                  let playerRiverDetails = {
                    decksUsedToday: getCurrentriverraceInfo.data.clan.participants[innerindex].decksUsedToday,
                    sent: false
                  }
                  riverRaceStruct[getCurrentriverraceInfo.data.clan.participants[innerindex].tag] = playerRiverDetails
                  elements_to_delete.push(innerindex)
                }
              }
              for (let i = 0; i < elements_to_delete.length; i++) {
                getCurrentriverraceInfo.data.clan.participants.splice(elements_to_delete[i], 1)
              }
            }
          }
        } catch (error) {
          if (error.message == 'Request failed with status code 404') {
            await Database.table('clash_royale_players')
              .where({
                clan_tag: curClanTag
              })
              .delete()
            continue
          }
          if (error.message == 'Request failed with status code 403') {
            const slack = new SlackController()
            slack.sendMessage('Clash Royale Auth Failed: Auth Token: ' + TOKEN)
            return 'Auth Error'
          }
          if (error.message == 'Request failed with status code 429') {
            const slack = new SlackController()
            slack.sendMessage('Clash Royale request was throttled! Auth Token: ' + TOKEN)
            return 'Throttled Error'
          }

          LoggingRepository.log({
            environment: process.env.NODE_ENV,
            type: 'error',
            source: 'backend',
            context: __filename,
            message: (error && error.message) || error,
            method: 'reminder_service_insider'
          })
        }
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
        method: 'reminder_service'
      })
    }
  }

  async sendEmail(email, curWar, preWar, clash_royale_reminders_id, alias) {
    //check if curWar is 0, if so dont send email but update DB for remainingWar
    //Otherwise send email , update DB with remainingWar n email Noti
    try {
      if (curWar == 0) {
        await ClashRoyaleReminder.query().where('id', '=', clash_royale_reminders_id).update({
          number_of_wars_remaining: 0
        })
      } else {
        const today = new Date()
        const emailController = new AWSEmailController()
        const email_welcome_body = new Email_body()

        const subject = "myG - The Gamer's platform - CR Reminder: " + new Date(Date.now()).toDateString()
        const body = await email_welcome_body.clash_royale_wars_remaining(alias)

        emailController.createEmailnSend(email, subject, body)

        await ClashRoyaleReminder.query().where('id', '=', clash_royale_reminders_id).update({
          email_notification_last_runtime: today,
          number_of_wars_remaining: curWar
        })
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
        method: 'sendEmail'
      })
    }
  }
}

module.exports = ClashRoyaleController
