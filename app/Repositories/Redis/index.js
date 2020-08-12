
const moment = require('moment');
const redis = require("redis");
const Redlock = require('redlock');
const keys = require("./keys");

const Env = use('Env')
const ChatGameMessageSchedule = use('App/Models/ChatGameMessageSchedule');

const isRedisEnabled = Env.get('REDIS_ENABLED');
const client = isRedisEnabled && redis.createClient(Env.get('REDIS_PORT'), Env.get('REDIS_HOST'));

class RedisRepository {

  async lock(resource, ttl) {
    if (!isRedisEnabled) return Promise.resolve(true);
    const redlock = new Redlock([client], { retryCount: 0 });
    return redlock.lock(resource, ttl)
      .then(() => Promise.resolve(true))
      .catch(() => Promise.resolve(false));
  }

  async setGameMessageSchedule(schedule) {
    if (!isRedisEnabled) return Promise.resolve();
    return new Promise(resolve => {
      client.set(keys.GAME_MESSAGE_SCHEDULE, schedule, (_, response) => resolve(response));
    });
  }

  async getGameMessageSchedule() {
    if (!isRedisEnabled) return this.loadGameMessageSchedule();
    return new Promise(resolve => {
      client.get(keys.GAME_MESSAGE_SCHEDULE, async (_, response) => {
        const schedule = response ? JSON.parse(response) : await this.loadGameMessageSchedule();
        resolve({ schedule });
      });
    });
  }

  async updateGameMessageSchedule({ chatId, schedule }) {
    const { schedule: fullSchedule } = await this.getGameMessageSchedule();
    fullSchedule.push({ chatId, schedule });
    await this.setGameMessageSchedule(JSON.stringify(fullSchedule));
  }

  async clearGameMessageSchedule({ chatIds }) {
    const { schedule: fullSchedule } = await this.getGameMessageSchedule();
    const clearedSchedule = fullSchedule.filter(entry => !chatIds.includes(entry.chatId));
    await this.setGameMessageSchedule(JSON.stringify(clearedSchedule));
  }

  async loadGameMessageSchedule() {
    const rawSchedule = await ChatGameMessageSchedule
      .query()
      .where('schedule', '>', moment())
      .orderBy('schedule', 'desc')
      .fetch();
    const schedule = (rawSchedule && rawSchedule.toJSON()) || [];
    await this.setGameMessageSchedule(JSON.stringify(schedule));
    return schedule;
  }

  async getRecentFailedLoginAttempts(ip) {
    if (!isRedisEnabled) return Promise.resolve(0);
    return new Promise(resolve => {
      client.get(`${keys.LOGIN_ATTEMPT_IP}|${ip}`, async (_, response) => resolve(parseInt(response) || 0));
    });
  }

  async registerFailedLoginAttempt(ip) {
    if (!isRedisEnabled) return Promise.resolve();
    return new Promise(async resolve => {
      const attempts = await this.getRecentFailedLoginAttempts(ip);
      client.set(`${keys.LOGIN_ATTEMPT_IP}|${ip}`, attempts + 1, 'EX', 300, (_, response) => resolve(response));
    });
  }

}

module.exports = new RedisRepository();