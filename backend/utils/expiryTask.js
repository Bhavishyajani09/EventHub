const Event = require('../models/Event');

const runExpiryTask = async () => {
    try {
        const now = new Date();
        const result = await Event.updateMany(
            {
                date: { $lt: now },
                isPublished: true
            },
            { isPublished: false }
        );

        if (result.modifiedCount > 0) {
            console.log(`[Expiry Task] Unpublished ${result.modifiedCount} expired events.`);
        }
    } catch (error) {
        console.error('[Expiry Task] Error:', error);
    }
};

// Run every hour
const startExpiryTask = () => {
    console.log('[Expiry Task] Scheduler started (runs every 1 hour)');
    // Run immediately on start
    runExpiryTask();
    // Schedule
    setInterval(runExpiryTask, 60 * 60 * 1000);
};

module.exports = startExpiryTask;
