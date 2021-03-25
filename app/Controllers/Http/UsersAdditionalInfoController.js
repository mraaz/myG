'use strict'

const Database = use('Database')
const User = use('App/Models/User')
const UsersAdditionalInfo = use('App/Models/UsersAdditionalInfo')

const LoggingRepository = require('../../Repositories/Logging')
const { getIp } = require('../../Common/ip')

const axios = use('axios')

class UsersAdditionalInfoController {
  async store({ auth }, logged_in_country_code, in_eu, last_logged_in_ip, logged_in_regional) {
    console.log(logged_in_country_code, '<<<logged_in_country_code')
    if (auth.user) {
      try {
        await Database.table('users_additional_infos').insert({
          user_id: auth.user.id,
          logged_in_country_code: logged_in_country_code,
          in_eu: in_eu,
          last_logged_in_ip: last_logged_in_ip,
          logged_in_regional: logged_in_regional,
        })
      } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
          await UsersAdditionalInfo.query()
            .where('user_id', '=', auth.user.id)
            .update({
              logged_in_country_code: logged_in_country_code,
              in_eu: in_eu,
              last_logged_in_ip: last_logged_in_ip,
              logged_in_regional: logged_in_regional,
            })
        } else {
          LoggingRepository.log({
            environment: process.env.NODE_ENV,
            type: 'error',
            source: 'backend',
            context: __filename,
            message: (error && error.message) || error,
          })
          return
        }
      }
      // await User.query()
      //   .where('id', '=', auth.user.id)
      //   .update({
      //     has_additional: true,
      //   })
    } else {
      return 'You are not Logged In!'
    }
  }

  async process_ip({ auth, req, response }) {
    //https://app.nuclino.com/myG/codebase/getting-clients-location-c3e14fd4-d2ed-4033-b298-4f18bc98f0d3
    console.log('GOING IN')
    const ip = getIp(req)
    console.log(ip, '<<<IP')
    if (ip == '127.0.0.1') return

    if (auth.user) {
      try {
        const fowardslash_Roll = Math.floor(Math.random() * 5) + 1
        let country,
          provider = '',
          logged_in_country_code = '',
          in_eu = false,
          last_logged_in_ip = '',
          logged_in_regional = ''

        switch (fowardslash_Roll) {
          case 1:
            provider = 'ipapi.co'
            country = await axios.get(`https://ipapi.co/${ip}/json/`)

            logged_in_country_code = country.data.country_code
            in_eu = country.data.in_eu
            last_logged_in_ip = country.data.ip
            logged_in_regional = country.data.city

            break
          case 2:
            provider = 'api.ipregistry.co/?key=of2bu80vcjh2it'
            country = await axios.get(`https://api.ipregistry.co/${ip}?key=of2bu80vcjh2it`)

            logged_in_country_code = country.data.location.country.code
            in_eu = country.data.location.in_eu
            last_logged_in_ip = country.data.ip
            logged_in_regional = country.data.location.city
            break
          case 3:
            provider = 'api.ipstack.com/check?access_key=10120187d278d72df281fc19ebdc3070'
            country = await axios.get(`http://api.ipstack.com/${ip}?access_key=10120187d278d72df281fc19ebdc3070`)

            logged_in_country_code = country.data.country_code
            in_eu = country.data.location.is_eu
            last_logged_in_ip = country.data.ip
            break
          case 4:
            provider = 'api.ipstack.com/check?access_key=f959edb7af1876fcd09362548c19ffaf'
            country = await axios.get(`http://api.ipstack.com/${ip}?access_key=f959edb7af1876fcd09362548c19ffaf`)

            logged_in_country_code = country.data.country_code
            in_eu = country.data.location.is_eu
            last_logged_in_ip = country.data.ip

            break
          case 5:
            provider = 'api.ipstack.com/check?access_key=0dbf12e7eb6cb8247151a32e1c27c0a7'
            country = await axios.get(`http://api.ipstack.com/${ip}?access_key=0dbf12e7eb6cb8247151a32e1c27c0a7`)

            logged_in_country_code = country.data.country_code
            in_eu = country.data.location.is_eu
            last_logged_in_ip = country.data.ip

            break

          default:
            provider = 'ipapi.co/json/'
            country = await axios.get(`https://ipapi.co/${ip}/json/`)

            logged_in_country_code = country.data.country_code
            in_eu = country.data.in_eu
            last_logged_in_ip = country.data.ip
            logged_in_regional = country.data.city
        }
        console.log('Asdfasdfdsaf')

        this.store({ auth }, logged_in_country_code, in_eu == null ? false : in_eu, last_logged_in_ip, logged_in_regional)
      } catch (error) {
        console.log('22222')
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message && provider) || error,
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }
}

module.exports = UsersAdditionalInfoController
