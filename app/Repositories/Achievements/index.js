

const Database = use('Database');
const UserStatTransactionController = use('App/Controllers/Http/UserStatTransactionController')
const BADGES = require('./badges.json');

class AchievementsRepository {
  async fetchBadges({ alias }) {
    const controller = new UserStatTransactionController();
    const { connections, likes, followers, games_played, games_created, community_members, account_age } = await controller.master_controller({ requestedAlias: alias });
    const badges = BADGES.map((badge) => {
      switch(badge.type) {
        case "connect": return this.getBadge(JSON.parse(JSON.stringify(badge)), connections);
        case "like": return this.getBadge(JSON.parse(JSON.stringify(badge)), likes);
        case "follow": return this.getBadge(JSON.parse(JSON.stringify(badge)), followers);
        case "play-games": return this.getBadge(JSON.parse(JSON.stringify(badge)), games_played);
        case "create-games": return this.getBadge(JSON.parse(JSON.stringify(badge)), games_created);
        case "create-community": return this.getBadge(JSON.parse(JSON.stringify(badge)), community_members);
        case "grow-community": return this.getBadge(JSON.parse(JSON.stringify(badge)), community_members);
        case "account-age": return this.getBadge(JSON.parse(JSON.stringify(badge)), account_age);
      }
    })
    return { badges };
  }

  getBadge(badge, value) {
    const unlockedValue = badge.values.find((badgeValue) => value < badgeValue);
    const parsedBadge = {
      ...badge,
      label: badge.label.replace('{value}', unlockedValue),
      experience: badge.experiences[badge.values.indexOf(unlockedValue)],
    };
    delete parsedBadge.values;
    delete parsedBadge.experiences;
    return parsedBadge;
  }
}

module.exports = new AchievementsRepository();