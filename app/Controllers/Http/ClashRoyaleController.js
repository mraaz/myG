'use strict'

const Database = use('Database')
const LoggingRepository = require('../../Repositories/Logging')
const axios = use('axios')

const util = require('util')

class ClashRoyaleController {
  async show({ auth, request, response }) {
    try {
      console.log('Got here')
      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjNkNmI1NzI5LWFmNjctNDgzNy1hMDY4LTUwYTQ5YWMwOWVmMyIsImlhdCI6MTYzMjQ2OTIwNCwic3ViIjoiZGV2ZWxvcGVyL2U0ZjA1ZjI4LWJmOGMtNDJmNS0yY2I1LTU0ZTZlNjA2N2QxMiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMjAuMjMuMTA2LjE1NyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.A3ovMAL32_TLiHVqZPR9lsl40MKlisBcY13I7PLjD8uNEQibDdpNqffNbx06O7RFG2U59b_AyrurxgukZYZKOA'

      // country = await axios.get(`https://api.clashroyale.com/v1/`)

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      const clanTag = 'QG8UQCV0'
      const showClanRequestURL = 'clans/' + '%23' + clanTag + '/members'
      const showRiverRaceLogRequestURL = 'clans/' + '%23' + clanTag + '/riverracelog'
      const showcurrentriverraceRequestURL = 'clans/' + '%23' + clanTag + '/currentriverrace'

      const tmpValue = await axios.get(`https://api.clashroyale.com/v1/${showcurrentriverraceRequestURL}`, config)
      return tmpValue.data
      //return tmpValue
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
}

module.exports = ClashRoyaleController
