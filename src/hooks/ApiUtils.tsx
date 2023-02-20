import {getAxiosGetClient, getAxiosUploadClient} from "./AxiosClient";
const baseUrl = 'http://localhost:8080/api/v1/'

export function getSalesItems(params: any) {
    const axiosClient = getAxiosGetClient(params)
    return axiosClient.get(baseUrl)
}

export function uploadSalesItems(file:File) {
    const axiosClient = getAxiosUploadClient()
    let bodyFormData = new FormData();
    bodyFormData.append('file', file);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return axiosClient.post(`${baseUrl}upload`, bodyFormData, config)
}