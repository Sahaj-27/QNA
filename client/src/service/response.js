import axios from 'axios';

const getUserResponse = async (userId, botname, userPrompt) => {
  try {
    const response = await axios.get('/api/response', {
      params: {
        user_id: userId,
        botname: botname,
        user_prompt: userPrompt
      }
    });
    return response.data; // Assuming the response contains the data you need
  } catch (error) {
    console.error('Error fetching user response:', error);
    throw error; // Handle errors appropriately
  }
};

// Usage
const userId = 'exampleUserId';
const botname = 'exampleBotname';
const userPrompt = 'exampleUserPrompt';

getUserResponse(userId, botname, userPrompt)
  .then(data => {
    console.log('User response:', data);
    // Handle response data
  })
  .catch(error => {
    // Handle errors
  });
