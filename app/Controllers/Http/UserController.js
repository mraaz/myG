'use strict'

const cryptico = require('cryptico')
const Database = use('Database')
const User = use('App/Models/User')
const GameName = use('App/Models/GameName')

const AwsKeyController = use('./AwsKeyController')
const FollowerController = use('./FollowerController')

const UserStatTransactionController = use('./UserStatTransactionController')
const UsersAdditionalInfoController = use('./UsersAdditionalInfoController')

const ProfileRepository = require('../../Repositories/Profile')
const ElasticsearchRepository = require('../../Repositories/Elasticsearch')
const ChatRepository = require('../../Repositories/Chat')
const NotificationsRepository = require('../../Repositories/Notifications')
const LoggingRepository = require('../../Repositories/Logging')
const EncryptionRepository = require('../../Repositories/Encryption')
const RedisRepository = require('../../Repositories/Redis')

// const generateRandomString = (length) => {
//   var result = ''
//   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   var charactersLength = characters.length
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength))
//   }
//   return result
// }

class UserController {
  async profile({ auth, request, response }) {
    if (!auth.user) {
      return 'You are not Logged In!'
    }

    var friend = undefined,
      following = undefined
    try {
      const user = await User.query()
        .where('id', '=', request.params.id)
        .fetch()
      if (auth.user.id != request.params.id) {
        friend = await Database.from('friends').where({
          user_id: auth.user.id,
          friend_id: request.params.id,
        })

        following = await Database.from('followers').where({
          user_id: auth.user.id,
          follower_id: request.params.id,
        })
      }

      return {
        user: user.toJSON(),
        friend: friend === undefined || friend.length == 0 ? false : true,
        following: following === undefined || following.length == 0 ? false : true,
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async profile_with_alias({ auth, request, response }) {
    try {
      const user = await Database.from('users')
        .where('alias', '=', request.params.alias)
        .first()
      const friend = await Database.from('friends').where({
        user_id: auth.user.id,
        friend_id: user.id,
      })

      return {
        user: user,

        friend: friend === undefined || friend.length == 0 ? false : true,
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        await User.query()
          .where('id', '=', auth.user.id)
          .update({
            first_name: await EncryptionRepository.encryptField(request.input('first_name_box')),
            last_name: await EncryptionRepository.encryptField(request.input('last_name_box')),
            slogan: request.input('slogan'),
            bio: request.input('bio'),
            country: request.input('country'),
            regional: request.input('regional'),
            contact_info: request.input('contact_info'),
            relationship_status: request.input('relationship_status'),
          })
        const { profile } = await ProfileRepository.fetchProfileInfo({ requestingUserId: auth.user.id, id: auth.user.id })
        await ElasticsearchRepository.storeUser({ user: profile })

        return 'Saved successfully'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async unfriend({ auth, request, response }) {
    if (auth.user) {
      try {
        const unfriendUser = await Database.table('friends')
          .where({
            user_id: auth.user.id,
            friend_id: request.params.id,
          })
          .delete()

        const unfriendUserViceVersa = await Database.table('friends')
          .where({
            user_id: request.params.id,
            friend_id: auth.user.id,
          })
          .delete()

        const myFollowerController = new FollowerController()
        myFollowerController.delete2({ auth }, request.params.id, auth.user.id)
        myFollowerController.delete2({ auth }, auth.user.id, request.params.id)

        const userStatController = new UserStatTransactionController()
        userStatController.update_total_number_of(auth.user.id, 'total_number_of_friends')
        userStatController.update_total_number_of(request.params.id, 'total_number_of_friends')

        return 'Deleted successfully'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async cancelFriendRequest({ auth, request, response }) {
    if (auth.user) {
      try {
        await Database.table('notifications')
          .where({
            user_id: auth.user.id,
            other_user_id: request.params.id,
            activity_type: 1,
          })
          .delete()
        const userId = request.params.id
        const notifications = await NotificationsRepository.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Cancelled successfully'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async playerSearchResults({ auth, request, response }) {
    try {
      const playerSearchResults = await Database.table('friends')
        .innerJoin('users', 'users.id', 'friends.friend_id')
        .where({ user_id: auth.user.id })
        .andWhere('alias', 'like', '%' + request.input('alias') + '%')
        .select('alias as first', 'profile_img', 'users.id as id')
        .limit(8)

      return {
        playerSearchResults,
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async keywordSearchResults({ auth, request, response }) {
    try {
      // const playerSearchResults = await Database.table('users')
      //   .whereNot({ id: auth.user.id })
      //   .andWhere('alias', 'like', '%' + request.input('keywords') + '%')
      //   .select('alias', 'profile_img', 'id')
      //   .paginate(request.input('counter'), 88)

      const playerSearchResults = await Database.table('friends')
        .innerJoin('users', 'users.id', 'friends.friend_id')
        .where({ user_id: auth.user.id })
        .andWhere('alias', 'like', '%' + request.input('keywords') + '%')
        .select('alias', 'profile_img', 'users.id as id')
        .paginate(request.input('counter'), 88)

      return {
        playerSearchResults,
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        if (auth.user.id == 1 || auth.user.id == '1') {
          return
        }

        const transferGames = await GameName.query()
          .where('user_id', '=', auth.user.id)
          .update({ user_id: 1 })

        const byebyebye = await Database.table('users')
          .where({
            id: auth.user.id,
          })
          .delete()

        return 'Deleted successfully'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async changeProfile({ auth, request, response }) {
    if (auth.user) {
      try {
        let update_key = new AwsKeyController()
        request.params.type = 1
        update_key.addUserKey({ auth, request, response })

        const saveUser = await User.query()
          .where('id', '=', auth.user.id)
          .update({ profile_img: request.input('profile_img') })

        const { profile } = await ProfileRepository.fetchProfileInfo({ requestingUserId: auth.user.id, id: auth.user.id })
        await ElasticsearchRepository.storeUser({ user: profile })

        return response.status(200).json({ success: true })
      } catch (error) {
        return response.status(200).json({ success: false })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async changeProfileBg({ auth, request, response }) {
    if (auth.user) {
      try {
        let update_key = new AwsKeyController()
        request.params.type = 2
        update_key.addUserKey({ auth, request, response })

        const saveUser = await User.query()
          .where('id', '=', auth.user.id)
          .update({ profile_bg: request.input('profile_bg') })

        const { profile } = await ProfileRepository.fetchProfileInfo({ requestingUserId: auth.user.id, id: auth.user.id })
        await ElasticsearchRepository.storeUser({ user: profile })
        return response.status(200).json({ success: true })
      } catch (error) {
        return response.status(200).json({ success: false })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async convertAliastoID({ auth, request, response }) {
    if (auth.user) {
      try {
        const aliasConverted = await Database.table('users')
          .where({
            alias: request.params.alias,
          })
          .select('id')

        return aliasConverted
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async toggleNotificationSounds({ auth, request }) {
    if (auth.user) {
      try {
        await User.query()
          .where('id', '=', auth.user.id)
          .update({
            notification_sounds_disabled: request.only('disabled').disabled,
          })
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async toggleAutoSelfDestruct({ auth, request }) {
    if (auth.user) {
      try {
        await User.query()
          .where('id', '=', auth.user.id)
          .update({
            chat_auto_self_destruct: request.only('enabled').enabled,
          })
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async update_has_additional() {
    const lock = await RedisRepository.lock('Update has_additional Field', 1000 * 60 * 5)
    if (!lock) return

    try {
      await User.query().update({
        has_additional: false,
      })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchOnlineUsers({ auth }) {
    if (!auth.user) return "You are not Logged In!";
    const myGames = await Database
      .select('game_names.game_name')
      .from('user_most_played_games')
      .leftJoin('game_names', 'game_names.id', 'user_most_played_games.game_name_id')
      .where('user_most_played_games.user_id', auth.user.id)
      .then((games) => [' All', ...games.map((game) => game.game_name)]);
    const onlineUsers = await Database
      .select(['users.alias', 'game_names.game_name', 'game_names.game_artwork'])
      .from('users')
      .leftJoin('user_most_played_games', 'user_most_played_games.user_id', 'users.id')
      .leftJoin('game_names', 'game_names.id', 'user_most_played_games.game_name_id')
      .where('users.status', 'online')
      .limit(100);
    const games = {};
    onlineUsers.forEach(({ alias, game_name, game_artwork }) => {
      if (!game_name) game_name = ' All';
      if (!games[game_name]) games[game_name] = { icon: game_artwork, gamers: [] };
      games[game_name].gamers.push(alias);
    });
    const preferredGames = Object.keys(games).sort().filter(game => myGames.includes(game)).map((game) => ({ game: game.trim(), ...games[game] }));
    const otherGames = Object.keys(games).sort().filter(game => !myGames.includes(game)).map((game) => ({ game: game.trim(), ...games[game] }));
    const gamesList = [...preferredGames, ...otherGames];
    gamesList.forEach(game => { game.gamers = game.gamers.filter(alias => alias !== auth.user.alias) });
    return gamesList.filter(game => game.gamers.length).slice(0, 10);
  }

  // async scrub_data() {
  //   console.log('<<<RAAAZ')
  //   console.log(process.env.NODE_ENV, '<<<<process.env.NODE_ENV')
  //   // const lock = await RedisRepository.lock('Update has_additional Field', 1000 * 60 * 5)
  //   // if (!lock) return
  //
  //   if (process.env.NODE_ENV != 'development') return
  //
  //   try {
  //     const all_users = await Database.from('users').select('id')
  //     for (var i = 0; i < all_users.length; i++) {
  //       const random_stuff = await this.haiku()
  //       await User.query()
  //         .where('id', '=', all_users[i].id)
  //         .update({
  //           email: random_stuff + generateRandomString(6),
  //         })
  //     }
  //   } catch (error) {
  //     LoggingRepository.log({
  //       environment: process.env.NODE_ENV,
  //       type: 'error',
  //       source: 'backend',
  //       context: __filename,
  //       message: (error && error.message) || error,
  //     })
  //   }
  // }
  // async haiku() {
  //   var adjs = [
  //       'autumn',
  //       'hidden',
  //       'bitter',
  //       'misty',
  //       'silent',
  //       'empty',
  //       'dry',
  //       'dark',
  //       'summer',
  //       'icy',
  //       'delicate',
  //       'quiet',
  //       'white',
  //       'cool',
  //       'spring',
  //       'winter',
  //       'patient',
  //       'twilight',
  //       'dawn',
  //       'crimson',
  //       'wispy',
  //       'weathered',
  //       'blue',
  //       'billowing',
  //       'broken',
  //       'cold',
  //       'damp',
  //       'falling',
  //       'frosty',
  //       'green',
  //       'long',
  //       'late',
  //       'lingering',
  //       'bold',
  //       'little',
  //       'morning',
  //       'muddy',
  //       'old',
  //       'red',
  //       'rough',
  //       'still',
  //       'small',
  //       'sparkling',
  //       'throbbing',
  //       'shy',
  //       'wandering',
  //       'withered',
  //       'wild',
  //       'black',
  //       'young',
  //       'holy',
  //       'solitary',
  //       'fragrant',
  //       'aged',
  //       'snowy',
  //       'proud',
  //       'floral',
  //       'restless',
  //       'divine',
  //       'polished',
  //       'ancient',
  //       'purple',
  //       'lively',
  //       'nameless',
  //     ],
  //     nouns = [
  //       'waterfall',
  //       'river',
  //       'breeze',
  //       'moon',
  //       'rain',
  //       'wind',
  //       'sea',
  //       'morning',
  //       'snow',
  //       'lake',
  //       'sunset',
  //       'pine',
  //       'shadow',
  //       'leaf',
  //       'dawn',
  //       'glitter',
  //       'forest',
  //       'hill',
  //       'cloud',
  //       'meadow',
  //       'sun',
  //       'glade',
  //       'bird',
  //       'brook',
  //       'butterfly',
  //       'bush',
  //       'dew',
  //       'dust',
  //       'field',
  //       'fire',
  //       'flower',
  //       'firefly',
  //       'feather',
  //       'grass',
  //       'haze',
  //       'mountain',
  //       'night',
  //       'pond',
  //       'darkness',
  //       'snowflake',
  //       'silence',
  //       'sound',
  //       'sky',
  //       'shape',
  //       'surf',
  //       'thunder',
  //       'violet',
  //       'water',
  //       'wildflower',
  //       'wave',
  //       'water',
  //       'resonance',
  //       'sun',
  //       'wood',
  //       'dream',
  //       'cherry',
  //       'tree',
  //       'fog',
  //       'frost',
  //       'voice',
  //       'paper',
  //       'frog',
  //       'smoke',
  //       'star',
  //     ]
  //
  //   return adjs[Math.floor(Math.random() * (adjs.length - 1))] + '_' + nouns[Math.floor(Math.random() * (nouns.length - 1))]
  // }
}

module.exports = UserController
