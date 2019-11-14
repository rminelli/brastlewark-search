import axios from "axios";

const baseUrl =
  "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";

// const GetData = axios.get(baseUrl).then( response => {
//   return  response.data;
// });



const GetData = async  () => { 
  const response = await axios.get(baseUrl) 
  return response.data
}



export default GetData;
