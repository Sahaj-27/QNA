import axios from 'axios';

const fetchFile = async (file_name, user_id, bot_name) => {
  try {
    const response = await axios.get(`/api/getFile?file_name=${file_name}&user_id=${user_id}&bot_name=${bot_name}`);
    return response.data; // assuming the response contains the file data
  } catch (error) {
    console.error('Error fetching file:', error);
    throw error; // handle error as needed
  }
}

// Example usage:
const fileData = await fetchFile('example.txt', 'user123', 'bot1');
console.log(fileData); // handle file data accordingly
