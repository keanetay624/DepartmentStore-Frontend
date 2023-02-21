import axios from 'axios';

export function getAxiosGetClient(params:any) {
  return axios.create({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    params: params
  });
}

export function getAxiosUploadClient() {
  return axios.create();
}