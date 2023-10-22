import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
// import { 
// 	getToken, 
// 	getUser, 
// 	getRefreshToken, setToken, setRefreshToken, setUser, removeUser, removeRefreshToken, removeToken } from "@/utils/index";
import * as authUtil from '@/utils/index';
import Notification from "@/components/notificationSend";
import { HEADER } from '@/constants/index';
import authApi from "./auth";
// Set up default config for http requests here

const axiosService = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 5000,
	headers: {
		"content-type": "application/json",
	},
});

axiosService.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
	const accessToken = authUtil.getToken();
	const user = authUtil.getUser();

	if (accessToken) {
		config.headers[HEADER.AUTHORIZATION] = `${accessToken}`;
	}

	if (user && user?.id) {
		config.headers[HEADER.CLIENT_ID] = `${user?.id}`;
	}

	return config;
}, function (error: AxiosError) {
	// Do something with request error
	return Promise.reject(error);
})

axiosService.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	async (error: AxiosError) => {
		const errorData: any = error?.['response']?.['data'];

		Notification({
			type: "error",
			message: "Notification Error",
			description: errorData?.['message'],
		});

		switch (error?.['response']?.['status']) {
			case 401:
				if (errorData?.message === 'jwt expired') {
					const refreshToken = authUtil.getRefreshToken();

					if (refreshToken) {
						const { metadata } = await authApi.reFreshToken(refreshToken);
						const { user, tokens } = metadata;

						authUtil.setUser(user)
						authUtil.setToken(tokens.accessToken)
						authUtil.setRefreshToken(tokens.refreshToken)
						setHeader(HEADER.AUTHORIZATION, tokens.accessToken)
						window.location.reload();
					}
				}

				return errorData;
			case 500:
				if (errorData?.message === 'invalid signature') {
					removeHeader(HEADER.AUTHORIZATION);
					authUtil.removeToken()
					authUtil.removeUser()
					authUtil.removeRefreshToken();
					window.location.href = "/login";
				}
				return errorData;
			default:
				return Promise.reject(error);
		}
	}
);

const setHeader = (name, value) => {
	axiosService.defaults.headers.common[name] = value;
};

const removeHeader = (name) => {
	delete axiosService.defaults.headers.common[name];
};

export {
	axiosService,
	setHeader,
	removeHeader
};
