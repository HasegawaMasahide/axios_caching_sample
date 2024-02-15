/**
 * 画面から呼び出すJS
 * ボタン押下時のイベント等を中心に定義
 */

import { MethodType, isMethodType } from "./sender";
import { ID, URL_TO } from "./constant";

/**
 * 画面の入力欄から送信先URLを取得する
 * 取得できなかった場合は固定値を用いる
 * @returns
 */
export const getUrlTo = () => {
	const input = document.getElementById(ID.INPUT.URL_TO) as HTMLInputElement;
	const url_to = input.value;
	return url_to || URL_TO;
}

/**
 * 画面の入力欄から直列・並列の実行回数を取得する
 * 取得できなかった場合 or 非数値の場合は1回とする
 * @returns
 */
export const getTimes = () => {
	const input = document.getElementById(ID.INPUT.TIMES) as HTMLInputElement;
	const times = input.value;
	return Number(times) || 1;
}

/**
 * 画面の入力欄からリクエストメソッドを取得する
 * 取得できなかった場合はGETとして扱う
 * @returns
 */
export const getRequestMethod: () => MethodType = () => {
	const select = document.getElementById(ID.INPUT.METHOD) as HTMLSelectElement;
	const method = select.value;
	return isMethodType(method) ? method : 'GET';
}

/**
 * 画面の入力欄を取得し、値をJSONとして解釈する
 * JSONにパースできない場合はundefined（送信しない）
 * @returns
 */
export const getCreateParamFunc = () => {
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
