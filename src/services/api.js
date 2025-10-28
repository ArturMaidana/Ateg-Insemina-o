import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://192.168.201.7/api'
  baseURL: 'https://api.happateg.senarmt.org.br/api',
  //baseURL: 'https://api.appateg.senarmt.org.br/api'
});
export default api;
