import { axiosService } from "./axiosService";

const authApi = {
    helloWorld() {
        const url = '/';
        return axiosService.get(url);
    },
    singUp(data) {
        const url = '/v1/api/user/signup';
        return axiosService.post(url, data);
    },
    login(body: any): Promise<typeLogin> {
        const url = '/v1/api/user/login';
        return axiosService.post(url, body);
    },
    menu(): Promise<typeMenu> {
        const url = '/v1/api/user/menu';
        return axiosService.get(url);
    },
}

export default authApi;