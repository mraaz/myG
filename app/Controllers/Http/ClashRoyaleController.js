'use strict'

const ClashRoyale = use('App/Models/ClashRoyale')
const Database = use('Database')

const CommonController = use('./CommonController')

const LoggingRepository = require('../../Repositories/Logging')
const axios = use('axios')

class ClashRoyaleController {
  async show({ auth, request, response }) {
    try {
      console.log('Got here')
      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjNkNmI1NzI5LWFmNjctNDgzNy1hMDY4LTUwYTQ5YWMwOWVmMyIsImlhdCI6MTYzMjQ2OTIwNCwic3ViIjoiZGV2ZWxvcGVyL2U0ZjA1ZjI4LWJmOGMtNDJmNS0yY2I1LTU0ZTZlNjA2N2QxMiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMjAuMjMuMTA2LjE1NyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.A3ovMAL32_TLiHVqZPR9lsl40MKlisBcY13I7PLjD8uNEQibDdpNqffNbx06O7RFG2U59b_AyrurxgukZYZKOA'

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      const clanTag = 'YL9YCYU' //'QG8UQCV0'
      const getClanURL = 'clans/' + '%23' + clanTag + '/members'
      const getRiverRaceLogURL = 'clans/' + '%23' + clanTag + '/riverracelog'
      const getCurrentriverraceURL = 'clans/' + '%23' + clanTag + '/currentriverrace'

      const getClanInfo = await axios.get(`https://api.clashroyale.com/v1/${getClanURL}`, config)
      const getCurrentriverraceInfo = await axios.get(`https://api.clashroyale.com/v1/${getCurrentriverraceURL}`, config)

      const isWarToday = getCurrentriverraceInfo.data.periodType == 'warDay' ? true : false
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
      for (let index = 0; index < getClanInfo.data.items.length; index++) {
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

      return getClanInfo.data
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }

  async update({ auth, request, response }) {
    if (auth.user) {
      try {
        const get_player = await Database.from('clash_royale_transactions')
          .where({
            player_tag: request.input('player_tag')
          })
          .first()

        if (get_player == undefined) {
          const commonController = new CommonController()
          const current_user_permission = await commonController.get_permission({ auth }, request.input('group_id'))

          if (current_user_permission != 0 && current_user_permission != 1) {
            await Database.table('clash_royale_transactions').where({ user_id: auth.user.id }).delete()
          }
        }

        await Database.table('clash_royale_transactions')
          .where({ player_tag: request.input('player_tag') })
          .update({ user_id: request.input('user_id') })

        return 'Saved successfully'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
          method: 'update'
        })
      }
    }
  }
}

module.exports = ClashRoyaleController
