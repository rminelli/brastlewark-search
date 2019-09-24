import axios from "axios";

const baseUrl =
  "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";

const GetData = axios.get(baseUrl).then(async response => {
  return await response.data;
});

export default GetData;
