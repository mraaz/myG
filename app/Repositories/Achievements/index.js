const get = require('lodash.get');
const Database = use('Database');
const UserStatTransactionController = use('App/Controllers/Http/UserStatTransactionController')
const UserStatTransaction = use('App/Models/UserStatTransaction')
const UserAchievements = use('App/Models/UserAchievements');
const BADGES = require('./badges.json');
const DAILYS = require('./daily.json');
const WEEKLYS = require('./weekly.json');
const MONTHLYS = require('./monthly.json');

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

  fetchDailyQuests = async ({ requestingUserId }) => {
    return this.fetchQuests({ requestingUserId, template: DAILYS, table: 'user_daily_quests' });
  }

  fetchWeeklyQuests = async ({ requestingUserId }) =>  {
    return this.fetchQuests({ requestingUserId, template: WEEKLYS, table: 'user_weekly_quests' });
  }

  fetchMonthlyQuests = async ({ requestingUserId }) =>  {
    return this.fetchQuests({ requestingUserId, template: MONTHLYS, table: 'user_monthly_quests' });
  }

  async fetchQuests({ requestingUserId, template, table }) {
    const response = await Database.table(table).where('user_id', requestingUserId);
    const quests = template.map((entry) => {
      const quest = { ...entry };
      quest.completed = response.filter(({ type }) => entry.type === type).length;
      const progress = (quest.completed / quest.total) * 100;
      quest.progress = progress > 100 ? 100 : progress;
      return quest;
    });
    const completed = quests.filter(({ completed, total }) => completed >= total).length;
    const collected = response.some(({ type }) => type === 'collect');
    return { collected, quests, completed, collectable: completed >= 3 };
  }

  async registerQuestStep({ user_id, type }) {
    return Promise.all([
      'user_daily_quests',
      'user_weekly_quests',
      'user_monthly_quests',
    ].map((table) => Database.table(table).insert({ user_id, type })));
  }

  async unregisterQuestStep({ user_id, type }) {
    return Promise.all([
      'user_daily_quests',
      'user_weekly_quests',
      'user_monthly_quests',
    ].map(async (table) => {
      const results = await Database.table(table).where({ user_id, type });
      const resultId = results && results[0] && results[0].id;
      if (resultId) await Database.table(table).where({ id: resultId }).delete();
    }));
  }

  async registerAccess({ requestingUserId }) {
    const user = await Database.from('users').where('id', requestingUserId).select(['last_seen']);
    const datesAreOnSameDay = (first, second) => first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();
    const hasAccessedToday = datesAreOnSameDay(new Date(), user[0].last_seen);
    if (hasAccessedToday) return;
    await this.registerQuestStep({ user_id: requestingUserId, type: 'login' });
  }

  async clearDailys() {
    await Database.table('user_daily_quests').delete();
  }
  
  async clearWeeklys() {
    await Database.table('user_weekly_quests').delete();
  }

  async clearMonthlys() {
    await Database.table('user_monthly_quests').delete();
  }

  async redeemDaily({ requestingUserId }) {
    return this.redeemQuests({ requestingUserId, table: 'user_daily_quests', fetchFunction: this.fetchDailyQuests });
  }

  async redeemWeekly({ requestingUserId }) {
    return this.redeemQuests({ requestingUserId, table: 'user_weekly_quests', fetchFunction: this.fetchWeeklyQuests });
  }

  async redeemMonthly({ requestingUserId }) {
    return this.redeemQuests({ requestingUserId, table: 'user_monthly_quests', fetchFunction: this.fetchMonthlyQuests });
  }

  async redeemQuests({ requestingUserId, table, fetchFunction }) {
    const { collected, collectable } = await fetchFunction({ requestingUserId });
    if (collected) throw new Error(`Gamer ${requestingUserId} tried to collect quest reward which is already collected.`);
    if (!collectable) throw new Error(`Gamer ${requestingUserId} tried to collect quest reward which is not collectable.`);

    const controller = new UserStatTransactionController();
    const criteria = await Database.from('user_stats').where('criteria', 'total_number_of_quests').select('id');
    const criteriaId = get(criteria, '[0].id');
    const current = await Database.from('user_stat_transactions')
      .where('user_stat_id', criteriaId)
      .andWhere('user_id', requestingUserId)
      .select('values');
    const newValue = (get(current, '[0].values') || 0) + 1;
    const newTransaction = {
      user_id: requestingUserId,
      user_stat_id: criteriaId,
      values: newValue,
      last_month_values: '0',
    };

    await UserStatTransaction.create(newTransaction);
    await controller.reCalculate_xp(requestingUserId);
    await Database.table(table).insert({ user_id: requestingUserId, type: 'collect' });
    
    return fetchFunction({ requestingUserId });
  }
}

module.exports = new AchievementsRepository();