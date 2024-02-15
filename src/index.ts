/**
 * 画面から呼び出すJS
 * ボタン押下時のイベント等を中心に定義
 */

import { AxiosInstance } from "axios";
import useClient, { MethodType, isMethodType } from "./utils";
import { with_adapter, with_extensions, with_no_cache } from "./clients";
import { CLASS_NAME_BUTTON_SELECTED, ID, URL_TO } from "./constant";
import fire from "./progress";

let client: AxiosInstance = with_no_cache;
let progress: HTMLProgressElement;

/**
 * 画面の入力欄から送信先URLを取得する
 * 取得できなかった場合は固定値を用いる
 * @returns
 */
const getUrlTo = () => {
	const input = document.getElementById(ID.INPUT.URL_TO) as HTMLInputElement;
	const url_to = input.value;
	return url_to || URL_TO;
}

/**
 * 画面の入力欄から直列・並列の実行回数を取得する
 * 取得できなかった場合 or 非数値の場合は1回とする
 * @returns 
 */
const getTimes = () => {
	const input = document.getElementById(ID.INPUT.TIMES) as HTMLInputElement;
	const times = input.value;
	return Number(times) || 1;
}

/**
 * 画面の入力欄からリクエストメソッドを取得する
 * 取得できなかった場合はGETとして扱う
 * @returns 
 */
const getRequestMethod: () => MethodType = () => {
	const select = document.getElementById(ID.INPUT.METHOD) as HTMLSelectElement;
	const method = select.value;
	return isMethodType(method) ? method : 'GET';
}

/**
 * 画面の入力欄を取得し、値をJSONとして解釈する
 * JSONにパースできない場合はundefined（送信しない）
 * @returns
 */
const getCreateParamFunc = () => {
	const textarea = document.getElementById(ID.INPUT.PARAM) as HTMLTextAreaElement;
	const template = textarea.value.replaceAll("%times%", "0");
	try {
		JSON.parse(template);	// 変換可能であれば、のチェック
		return (times: number) => {
			const paramStr = textarea.value.replaceAll("%times%", String(times));
			return JSON.parse(paramStr);	// ↑で変換可能ならここでも変換可能、と判断
		};
	} catch(e) {
		console.warn("cannot parse to json, so send empty object");
		console.warn(e);
		console.warn(template);
		return (times: number) => undefined;
	}
};

/**
 * 「1回リクエスト」ボタン用のイベント
 * @param paramId
 */
const onClickSingleSend = () => {
	console.log("onClickSingleSend");
	fire(progress);
	const paramCreator = getCreateParamFunc();
	const url_to = getUrlTo();
	const method = getRequestMethod();

	useClient(client, method)
	.send_once(url_to, paramCreator)
	.then(result => {
		console.log("send_once finished");
		console.log(result);
	});
};

/**
 * 「並列で指定回数リクエスト」ボタン用のイベント
 * @param paramId
 */
const onClickParallelSend = () => {
	console.log("onClickParallelSend");
	fire(progress);
	const paramCreator = getCreateParamFunc();
	const url_to = getUrlTo();
	const method = getRequestMethod();
	const times = getTimes();

	useClient(client, method)
	.send_multiple_parallel(url_to, times, paramCreator)
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
	fire(progress);
	const paramCreator = getCreateParamFunc();
	const url_to = getUrlTo();
	const method = getRequestMethod();
	const times = getTimes();

	useClient(client, method)
	.send_multiple_serial(url_to, times, paramCreator)
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
	Object.entries(ID.USE)
	.map(([key, value]) => value)
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
	addClassToButton(ID.USE.NO_CACHE);
}

/**
 * Axiosのインスタンス切り替え（axios-cache-adapter）
 */
const onClickUseAdapter = () => {
	console.log("use axios-cache-adapter...");
	client = with_adapter;
	removeClassFromButtons();
	addClassToButton(ID.USE.ADAPTER);
}

/**
 * Axiosのインスタンス切り替え（axios-extensions）
 */
const onClickUseExtensions = () => {
	console.log("use axios-extensions...");
	client = with_extensions;
	removeClassFromButtons();
	addClassToButton(ID.USE.EXTENSIONS);
}


/**
 * 画面にイベントを割り当てる
 */
const onLoad = () => {
	const url_to_input = document.getElementById(ID.INPUT.URL_TO) as HTMLInputElement;
	url_to_input.value = URL_TO;

	progress = document.getElementById(ID.PROGRESS) as HTMLProgressElement;

	console.log("add event listeners...");
	document.getElementById(ID.SEND.ONCE)?.addEventListener("click", onClickSingleSend);
	document.getElementById(ID.SEND.PARALLEL)?.addEventListener("click", onClickParallelSend);
	document.getElementById(ID.SEND.SERIAL)?.addEventListener("click", onClickSerialSend);

	document.getElementById(ID.USE.NO_CACHE)?.addEventListener("click", onClickUseNoCache);
	document.getElementById(ID.USE.ADAPTER)?.addEventListener("click", onClickUseAdapter);
	document.getElementById(ID.USE.EXTENSIONS)?.addEventListener("click", onClickUseExtensions);
}
window.onload = onLoad;
