/**
 * キャッシュする秒数
 */
export const CACHE_MAX_AGE_SEC = 5;

/**
 * デフォルトのリクエスト先URL
 */
export const URL_TO = "https://httpbin.org/get";

/**
 * Bulmaのボタン
 */
export const CLASS_NAME_BUTTON_SELECTED = "is-primary";

/**
 * HTMLのID属性と合わせて定義する
 */
export const ID = {
	PROGRESS: "progress",

	INPUT: {
		URL_TO: "url_to",
		METHOD: 'method',
		TIMES: 'times',
		PARAM: "param",
	},

	SEND: {
		ONCE: "once",
		PARALLEL: "parallel",
		SERIAL: "serial",
	},

	USE: {
		NO_CACHE: "no_cache",
		ADAPTER: "adapter",
		EXTENSIONS: "extensions",
	}
}
