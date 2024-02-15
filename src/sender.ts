import { AxiosInstance, AxiosResponse } from "axios";

const ALLOWED_AXIOS_METHOD = {
	GET: 'get',
	POST: 'post'
} as const;
export type MethodType = keyof typeof ALLOWED_AXIOS_METHOD;
export const isMethodType = (arg: any): arg is MethodType => {
	return arg in ALLOWED_AXIOS_METHOD;
}

/**
 * Axiosのインスタンスを渡すと、リクエスト実行処理を提供するファクトリ
 * @param client
 * @returns
 */
const useClient = (client:AxiosInstance, method: MethodType) => {
	return {
		send_once: (url: string, paramCreator: (times: number) => object) => send_once(client, method, url, paramCreator),
		send_multiple_parallel: (url: string, times: number, paramCreator: (times: number) => object) => send_multiple_parallel(client, method, times, url, paramCreator),
		send_multiple_serial: (url: string, times: number, paramCreator: (times: number) => object) => send_multiple_serial(client, method, times, url, paramCreator)
	}
}

/**
 * シンプルなGETリクエストのラッパー
 * @param client
 * @param url
 * @param params
 * @returns
 */
const send_once = (client:AxiosInstance, method: MethodType, url: string, paramCreator: (times: number) => object) => client[ALLOWED_AXIOS_METHOD[method]](url, paramCreator(1));

/**
 * GETリクエストを複製し、並列に実行するラッパー
 * @param client
 * @param times
 * @param url
 * @param params
 * @returns
 */
const send_multiple_parallel = (client:AxiosInstance, method: MethodType, times:number, url: string, paramCreator: (times: number) => object) => {
	const requests = [...Array(times)].map((_, i) => client[ALLOWED_AXIOS_METHOD[method]](url, paramCreator(i)));
	const parallel = Promise.all(requests);
	return parallel;
}

/**
 * GETリクエストを複製し、直列に実行するラッパー
 * ref. https://qiita.com/arx8/items/021e19189c9e0f60748e#lvfinal
 * @param times
 * @param url
 * @param params
 * @returns
 */
const send_multiple_serial = async (client:AxiosInstance, method: MethodType, times:number, url: string, paramCreator: (times: number) => object) => {
	const requests = [...Array(times)].map((_, i) => () => client[ALLOWED_AXIOS_METHOD[method]](url, paramCreator(i)));
	const results: AxiosResponse<any>[] = [];

	// reduce の初期値として使いたいので取り出す
	const first = requests.shift();
	if (first == null) {
		return [];
	}

	await requests
		// 末尾に空のPromiseがないと、最後のPromiseの結果をresultsにpushできないため
		.concat(() => (Promise.resolve({}) as Promise<AxiosResponse<any>>))
		.reduce(async (prev, next) => {
			await prev.then(result => results.push(result));
			return next();
		}, Promise.resolve(first()))

	return results;
}

export default useClient;
