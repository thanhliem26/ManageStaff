import { axiosService } from "./axiosService";

const authApi = {
    helloWorld() {
        const url = '/';
        return axiosService.get(url);
    },
    login(body) {
        const url = '/login';
        return axiosService.post(url, body);
    },
}

export default authApi;