
const redis = require("redis");
const Redlock = require('redlock');
const keys = require("./keys");

const Env = use('Env')
const ChatGameMessageSchedule = use('App/Models/ChatGameMessageSchedule');

const isRedisEnabled = Env.get('REDIS_ENABLED');
const client = isRedisEnabled && redis.createClient(Env.get('REDIS_PORT'), Env.get('REDIS_HOST'));

class RedisRepository {
  
  getRedLock() {
    return new Redlock([client], {
      // the expected clock drift; for more details
      // see http://redis.io/topics/distlock
      driftFactor: 0.01, // multiplied by lock ttl to determine drift time

      // the max number of times Redlock will attempt
      // to lock a resource before erroring
      retryCount:  3,

      // the time in ms between attempts
      retryDelay:  200, // time in ms

      // the max time in ms randomly added to retries
      // to improve performance under high contention
      // see https://www.awsarchitectureblog.com/2015/03/backoff.html
      retryJitter:  200 // time in ms
    });
  }

  async lock(resource) {
    if (!isRedisEnabled) return Promise.resolve(null);
    const redlock = this.getRedLock();
    return redlock.lock(resource, 5000);
  }

  async unlock(resource) {
    if (!isRedisEnabled) return Promise.resolve(null);
    const redlock = this.getRedLock();
    return redlock.unlock(resource);
  }

  async getMip() {
    if (!isRedisEnabled) return Promise.resolve(null);
    return new Promise(resolve => {
      client.get(keys.MIP, (_, response) => resolve(response));
    });
  }

  async setMip(mip) {
    if (!isRedisEnabled) return Promise.resolve();
    return new Promise(resolve => {
      client.set(keys.MIP, mip, (_, response) => resolve(response));
    });
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
    const zeroPad = (number) => number < 10 ? `0${number}` : number;
    const today = new Date();
    const scheduleDate = `${today.getFullYear()}-${zeroPad(today.getMonth() + 1)}-${zeroPad(today.getDate())} ${zeroPad(today.getHours())}:${zeroPad(today.getMinutes())}:${zeroPad(today.getSeconds())}`
    const rawSchedule = await ChatGameMessageSchedule
      .query()
      .where('schedule', '>', scheduleDate)
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
