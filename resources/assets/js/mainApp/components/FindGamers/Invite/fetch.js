import { PullDataFunction as getScheduleGames } from '../../scheduledGames/getScheduleGames'

export default async function fetchGames() {
  const scheduleGames = await getScheduleGames({ counter: 1 })
  if (scheduleGames.data && scheduleGames.data.latestScheduledGames.length > 0) {
    return scheduleGames.data.latestScheduledGames;
  }
  return [];
}
