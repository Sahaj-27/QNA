import axios from 'axios';

const getBotHistory = async (userId, botName) => {
  try {
    const response = await axios.get('/api/history', {
      params: {
        user_id: userId,
        bot_name: botName
      }
    });
    return response.data; // Assuming the response contains the bot history data
  } catch (error) {
    console.error('Error fetching bot history:', error);
    throw error; // Handle errors appropriately
  }
};

// Usage
const userId = 'exampleUserId';
const botName = 'exampleBotname';

getBotHistory(userId, botName)
  .then(data => {
    console.log('Bot history:', data);
    // Handle bot history data
  })
  .catch(error => {
    // Handle errors
  });