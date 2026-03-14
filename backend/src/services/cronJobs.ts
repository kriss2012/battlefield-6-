import cron from 'node-cron';
import { fetchAndStorePlayerStats, fetchTrackedPlayers, updateTrackedPlayerFetchTime } from './statsCollector';

export function startCronJobs() {
  console.log('⏰ Starting cron jobs...');

  // Fetch stats for all tracked players daily at 2 AM
  cron.schedule('0 2 * * *', async () => {
    console.log('🔄 Running daily stats collection...');
    await collectAllTrackedPlayerStats();
  });

  // Also run every 6 hours for more frequent updates
  cron.schedule('0 */6 * * *', async () => {
    console.log('🔄 Running 6-hourly stats collection...');
    await collectAllTrackedPlayerStats();
  });

  console.log('✅ Cron jobs started:');
  console.log('  - Daily stats collection at 2 AM');
  console.log('  - 6-hourly stats collection');
}

async function collectAllTrackedPlayerStats() {
  try {
    const trackedPlayers = await fetchTrackedPlayers();

    if (trackedPlayers.length === 0) {
      console.log('ℹ️  No tracked players found');
      return;
    }

    console.log(`📊 Collecting stats for ${trackedPlayers.length} tracked players...`);

    for (const player of trackedPlayers) {
      await fetchAndStorePlayerStats(player.player_id, player.player_name);
      await updateTrackedPlayerFetchTime(player.player_id);

      // Add delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log('✅ Stats collection complete');
  } catch (error) {
    console.error('❌ Error in stats collection:', error);
  }
}

// Export for manual triggering
export { collectAllTrackedPlayerStats };
