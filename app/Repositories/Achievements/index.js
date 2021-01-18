

const UserStatTransactionController = use('App/Controllers/Http/UserStatTransactionController')
const UserAchievements = use('App/Models/UserAchievements');
const BADGES = require('./badges.json');

class AchievementsRepository {
  async fetchBadges({ alias }) {
    const controller = new UserStatTransactionController();
    const stats = await controller.master_controller({ requestedAlias: alias });
    const redeemed = await this.fetchRedeemedBadges({ userId: stats.userId });
    const badges = this.getBadges(stats, redeemed);
    return { badges, stats, controller, redeemedTotal: redeemed.length, badgesTotal: BADGES.map(({ values }) => values.length).reduce((a, b) => a + b, 0) };
  }

  async fetchRedeemedBadges({ userId }) {
    const achievementsResponse = await UserAchievements.query().where("user_id", userId).fetch();
    return achievementsResponse && achievementsResponse.toJSON() || [];
  }

  async redeemBadge({ requestingUserId, alias, type, value }) {
    const { badges, stats, controller, redeemedTotal, badgesTotal } = await this.fetchBadges({ alias });
    const badge = badges.find((badge) => badge.type === type);
    if (badge.value !== value) throw new Error(`Gamer ${alias} tried to redeem Badge ${type}/${value}, not allowed.`);
    const newRedeemed = new UserAchievements();
    newRedeemed.user_id = requestingUserId;
    newRedeemed.type = badge.type;
    newRedeemed.value = badge.value;
    newRedeemed.experience = badge.experience;
    await newRedeemed.save();
    await controller.reCalculate_xp(requestingUserId);
    const redeemed = await this.fetchRedeemedBadges({ userId: requestingUserId });
    const updatedBadges = this.getBadges(stats, redeemed);
    return { badges: updatedBadges, badgesTotal, redeemedTotal: redeemedTotal + 1 };
  }

  getBadges(stats, redeemed) {
    const { total_number_of_friends, total_number_of_communities, likes, followers, games_played, games_created, community_members, account_age } = stats;
    const badges = BADGES.map((badge) => {
      switch(badge.type) {
        case "connect": return this.getBadge(JSON.parse(JSON.stringify(badge)), total_number_of_friends, redeemed.filter((badge) => badge.type === 'connect' ).map((badge) => badge.value));
        case "like": return this.getBadge(JSON.parse(JSON.stringify(badge)), likes, redeemed.filter((badge) => badge.type === 'like' ).map((badge) => badge.value));
        case "follow": return this.getBadge(JSON.parse(JSON.stringify(badge)), followers, redeemed.filter((badge) => badge.type === 'follow' ).map((badge) => badge.value));
        case "play-games": return this.getBadge(JSON.parse(JSON.stringify(badge)), games_played, redeemed.filter((badge) => badge.type === 'play-games' ).map((badge) => badge.value));
        case "create-games": return this.getBadge(JSON.parse(JSON.stringify(badge)), games_created, redeemed.filter((badge) => badge.type === 'create-games' ).map((badge) => badge.value));
        case "create-community": return this.getBadge(JSON.parse(JSON.stringify(badge)), total_number_of_communities, redeemed.filter((badge) => badge.type === 'create-community' ).map((badge) => badge.value));
        case "grow-community": return this.getBadge(JSON.parse(JSON.stringify(badge)), community_members, redeemed.filter((badge) => badge.type === 'grow-community' ).map((badge) => badge.value));
        case "account-age": return this.getBadge(JSON.parse(JSON.stringify(badge)), account_age, redeemed.filter((badge) => badge.type === 'account-age' ).map((badge) => badge.value));
      }
    });
    return badges.filter(({ value }) => !!value).sort(({ progress: x }, { progress: y }) => y - x);
  }

  getBadge(badge, value, redeemed) {
    const unredeemed = badge.values.filter((value) => !redeemed.includes(value))[0];
    const parsedBadge = {
      ...badge,
      value: unredeemed,
      label: badge.label.replace('{value}', unredeemed),
      experience: badge.experiences[badge.values.indexOf(unredeemed)],
      unlocked: unredeemed <= value,
      progress: unredeemed <= value ? 1 : value / unredeemed,
      icon: unredeemed <= value ? badge.activeIcon : badge.inactiveIcon,
    };
    delete parsedBadge.values;
    delete parsedBadge.experiences;
    delete parsedBadge.activeIcon;
    delete parsedBadge.inactiveIcon;
    return parsedBadge;
  }
}

module.exports = new AchievementsRepository();