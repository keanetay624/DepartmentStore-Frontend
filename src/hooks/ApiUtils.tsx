import getAxiosClient from "./AxiosClient";
const baseUrl = 'http://localhost:8080/api/v1/'

export function getSalesItems(params: any) {
    const axiosClient = getAxiosClient(params)
    return axiosClient.get(baseUrl)
}