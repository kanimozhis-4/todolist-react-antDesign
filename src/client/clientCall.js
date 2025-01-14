// services/client.js
import axios from 'axios';
const clientCall = async (endpoint, method = 'GET', payload=null) => {
  try {  
    const config={
        url: endpoint,
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        data: payload
    }
    console.log("response",config)
    const response = await axios(config);
    return response;
  } catch (error) {
    console.log('API call failed:', error.message);
  }
}; 
export default clientCall
