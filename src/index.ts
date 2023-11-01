/**
 * 画面から呼び出すJS
 * ボタン押下時のイベント等を中心に定義
 */

import { AxiosInstance } from "axios";
import useClient from "./utils";
import { with_adapter, with_extensions, with_no_cache } from "./clients";

const URL_TO = "https://httpbin.org/get";

const ID_URL_TO = "url_to";
const ID_PARAM = "param";
const ID_SEND_ONCE = "once";
const ID_SEND_PARALLEL = "parallel";
const ID_SEND_SERIAL = "serial";
const ID_USE_NO_CACHE = "no_cache";
const ID_USE_ADAPTER = "adapter";
const ID_USE_EXTENSIONS = "extensions";

const CLASS_NAME_BUTTON_SELECTED = "is-primary";

let client: AxiosInstance = with_no_cache;

/**
 * 画面の入力欄から送信先URLを取得する
 * 取得できなかった場合は固定値を用いる
 * @returns
 */
const getUrlTo = () => {
	const input = document.getElementById(ID_URL_TO) as HTMLInputElement;
	const url_to = input.value;
	return url_to || URL_TO;
}

/**
 * 画面の入力欄を取得し、値をJSONとして解釈する
 * JSONにパースできない場合はundefined（送信しない）
 * @returns
 */
const getParams = () => {
	const textarea = document.getElementById(ID_PARAM) as HTMLTextAreaElement;
	const paramStr = textarea.value;
	try {
		const param = JSON.parse(paramStr);
		return param;
	} catch(e) {
		console.warn("cannot parse to json, so send empty object");
		return undefined;
	}
};

/**
 * 「1回リクエスト」ボタン用のイベント
 * @param paramId
 */
const onClickSingleSend = () => {
	console.log("onClickSingleSend");
	const params = getParams();
	const url_to = getUrlTo();

	useClient(client)
	.send_once(url_to, params)
	.then(result => {
		console.log("send_once finished");
		console.log(result);
	});
};

/**
 * 「並列で10回リクエスト」ボタン用のイベント
 * @param paramId
 */
const onClickParallelSend = () => {
	console.log("onClickParallelSend");
	const params = getParams();
	const url_to = getUrlTo();

	useClient(client)
	.send_multiple_parallel(url_to, 10, params)
	.then(result => {
		console.log("send_multiple_parallel finished");
		console.log(result);
	});
};

/**
 * 「直列で10回リクエスト」ボタン用のイベント
 * @param paramId
 */
const onClickSerialSend = () => {
	console.log("onClickSerialSend");

	const params = getParams();
	const url_to = getUrlTo();

	useClient(client)
	.send_multiple_serial(url_to, 10, params)
	.then(result => {
		console.log("send_multiple_serial finished");
		console.log(result);
	});
};


const addClassToButton = (id: string) => {
	const button = document.getElementById(id) as HTMLButtonElement;
	button.classList.add(CLASS_NAME_BUTTON_SELECTED);
}

const removeClassFromButtons = () => {
	[ID_USE_NO_CACHE, ID_USE_ADAPTER, ID_USE_EXTENSIONS]
	.forEach(id => {
		const button = document.getElementById(id) as HTMLButtonElement;
		button.classList.remove(CLASS_NAME_BUTTON_SELECTED);
	});
}

/**
 * Axiosのインスタンス切り替え（デフォルト）
 */
const onClickUseNoCache = () => {
	console.log("use no-cache...");
	client = with_no_cache;
	removeClassFromButtons();
	addClassToButton(ID_USE_NO_CACHE);
}

/**
 * Axiosのインスタンス切り替え（axios-cache-adapter）
 */
const onClickUseAdapter = () => {
	console.log("use axios-cache-adapter...");
	client = with_adapter;
	removeClassFromButtons();
	addClassToButton(ID_USE_ADAPTER);
}

/**
 * Axiosのインスタンス切り替え（axios-extensions）
 */
const onClickUseExtensions = () => {
	console.log("use axios-extensions...");
	client = with_extensions;
	removeClassFromButtons();
	addClassToButton(ID_USE_EXTENSIONS);
}


/**
 * 画面にイベントを割り当てる
 */
const init = () => {
	console.log("add event listeners...");
	document.getElementById(ID_SEND_ONCE)?.addEventListener("click", onClickSingleSend);
	document.getElementById(ID_SEND_PARALLEL)?.addEventListener("click", onClickParallelSend);
	document.getElementById(ID_SEND_SERIAL)?.addEventListener("click", onClickSerialSend);


	document.getElementById(ID_USE_NO_CACHE)?.addEventListener("click", onClickUseNoCache);
	document.getElementById(ID_USE_ADAPTER)?.addEventListener("click", onClickUseAdapter);
	document.getElementById(ID_USE_EXTENSIONS)?.addEventListener("click", onClickUseExtensions);
}
window.onload = init;
