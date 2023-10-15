import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import { getToken, getUser, removeToken, removeUser } from "@/utils/index";
import Notification from "@/components/notificationSend";

// Set up default config for http requests here

const axiosService = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 5000,
	headers: {
		"content-type": "application/json",
	},
});

axiosService.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
	const accessToken = getToken();
	const user = getUser();

	if (accessToken) {
		config.headers["Authorization"] = `${accessToken}`;
	}

	if(user && user?.id) {
		config.headers["x-client-id"] = `${user?.id}`;
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
	(error: AxiosError) => {
		const errorData = error?.['response']?.['data'];

		Notification({
			type: "error",
			message: "Notification Error",
			description: errorData?.['message'],
		  });

		switch (error?.['response']?.['status']) {
			case 401:
				// removeHeader("Authorization");
				// removeToken()
				// removeUser()
				// window.location.href = "/login";

				return errorData;
			case 500:
				// if (error.response.data.message === 'jwt expired') {
				// 	removeHeader("Authorization");
				// 	removeToken()
				// 	removeUser()
				// 	window.location.href = "/login";
				// }
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
