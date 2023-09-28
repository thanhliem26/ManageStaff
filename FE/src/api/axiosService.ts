import axios, {AxiosError, AxiosResponse} from "axios";
// import { getToken, removeToken, removeUser } from "../utils";

// Set up default config for http requests here

const axiosService = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 5000,
	headers: {
		"content-type": "application/json",
	},
});

axiosService.interceptors.request.use(async (config) => {
	// const accessToken = getToken();

	// if (accessToken) {
	// 	config.headers["Authorization"] = `${accessToken}`;
	// }

	return config;
}, function (error) {
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
		// switch (error.response.status) {
		// 	case 401:
		// 		removeHeader("Authorization");
		// 		removeToken()
		// 		removeUser()
		// 		window.location.href = "/login";

		// 		break;
		// 	case 500:
		// 		if (error.response.data.message === 'jwt expired') {
		// 			removeHeader("Authorization");
		// 			removeToken()
		// 			removeUser()
		// 			window.location.href = "/login";
		// 		}
		// 		break;
		// 	default:
		// 		return Promise.reject(error);
		// }
		return Promise.reject(error);
	}
);

// const setHeader = (name, value) => {
// 	axiosService.defaults.headers.common[name] = value;
// };

// const removeHeader = (name) => {
// 	delete axiosService.defaults.headers.common[name];
// };

export {
	axiosService,
	// setHeader, 
	// removeHeader 
};
