/**
 * 画面から呼び出すJS
 * ボタン押下時のイベント等を中心に定義
 */

import { AxiosInstance } from "axios";
import useClient from "./sender";
import { with_adapter, with_extensions, with_no_cache } from "./clients";
import { CLASS_NAME_BUTTON_SELECTED, ID, URL_TO } from "./constant";
import fire from "./progress";
import { getCreateParamFunc, getUrlTo, getRequestMethod, getTimes } from "./dom_reader";

let client: AxiosInstance = with_no_cache;
let progress: HTMLProgressElement;
export const setProgress = (element: HTMLProgressElement) => {
	progress = element;
}

/**
 * 「1回リクエスト」ボタン用のイベント
 * @param paramId
 */
export const onClickSingleSend = () => {
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
export const onClickParallelSend = () => {
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
export const onClickSerialSend = () => {
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
export const onClickUseNoCache = () => {
	console.log("use no-cache...");
	client = with_no_cache;
	removeClassFromButtons();
	addClassToButton(ID.USE.NO_CACHE);
}

/**
 * Axiosのインスタンス切り替え（axios-cache-adapter）
 */
export const onClickUseAdapter = () => {
	console.log("use axios-cache-adapter...");
	client = with_adapter;
	removeClassFromButtons();
	addClassToButton(ID.USE.ADAPTER);
}

/**
 * Axiosのインスタンス切り替え（axios-extensions）
 */
export const onClickUseExtensions = () => {
	console.log("use axios-extensions...");
	client = with_extensions;
	removeClassFromButtons();
	addClassToButton(ID.USE.EXTENSIONS);
}
