import {
  fetchDailyQuests,
  fetchWeeklyQuests,
  fetchMonthlyQuests,
  redeemDailyQuests,
  redeemWeeklyQuests,
  redeemMonthlyQuests
} from '../../integration/http/quests'

export function fetchDailyQuestsAction() {
  return {
    type: 'FETCH_DAILY_QUESTS',
    payload: fetchDailyQuests()
  }
}

export function fetchWeeklyQuestsAction() {
  return {
    type: 'FETCH_WEEKLY_QUESTS',
    payload: fetchWeeklyQuests()
  }
}

export function fetchMonthlyQuestsAction() {
  return {
    type: 'FETCH_MONTHLY_QUESTS',
    payload: fetchMonthlyQuests()
  }
}

export function redeemDailyQuestsAction() {
  return {
    type: 'FETCH_DAILY_QUESTS',
    payload: redeemDailyQuests()
  }
}

export function redeemWeeklyQuestsAction() {
  return {
    type: 'FETCH_WEEKLY_QUESTS',
    payload: redeemWeeklyQuests()
  }
}

export function redeemMonthlyQuestsAction() {
  return {
    type: 'FETCH_MONTHLY_QUESTS',
    payload: redeemMonthlyQuests()
  }
}
