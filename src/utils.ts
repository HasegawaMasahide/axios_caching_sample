import { AxiosInstance, AxiosResponse } from "axios";

/**
 * Axiosのインスタンスを渡すと、リクエスト実行処理を提供するファクトリ
 * @param client
 * @returns
 */
const useClient = (client:AxiosInstance) => {
	return {
		send_once: (url: string, params?: object) => send_once(client, url, params),
		send_multiple_parallel: (url: string, times: number, params?: object) => send_multiple_parallel(client, times, url, params),
		send_multiple_serial: (url: string, times: number, params?: object) => send_multiple_serial(client, times, url, params)
	}
}

/**
 * シンプルなGETリクエストのラッパー
 * @param client
 * @param url
 * @param params
 * @returns
 */
const send_once = (client:AxiosInstance, url: string, params?: object) => client.get(url, { params });

/**
 * GETリクエストを複製し、並列に実行するラッパー
 * @param client
 * @param times
 * @param url
 * @param params
 * @returns
 */
const send_multiple_parallel = (client:AxiosInstance, times:number, url: string, params?: object) => {
	const requests = [...Array(times)].map(i => client.get(url, { params }));
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
const send_multiple_serial = async (client:AxiosInstance, times:number, url: string, params?: object) => {
	const requests = [...Array(times)].map(i => () => client.get(url, { params }));
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
