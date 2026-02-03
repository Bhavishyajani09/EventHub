// Add this route to server.js temporarily for debugging
app.get('/debug/organizers', async (req, res) => {
  try {
    const Organizer = require('./models/Organizer');
    const organizers = await Organizer.find({}).select('-password');
    res.json({
      count: organizers.length,
      organizers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});