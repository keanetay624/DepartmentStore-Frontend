import axios from 'axios';

export default function getAxiosClient(params:any) {
  return axios.create({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    params: params
  });
}