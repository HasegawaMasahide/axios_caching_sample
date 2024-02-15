/**
 * 画面から呼び出すJS
 * ボタン押下時のイベント等を中心に定義
 */

import { ID, URL_TO } from "./constant";
import {
	onClickSingleSend,
	onClickParallelSend,
	onClickSerialSend,
	onClickUseNoCache,
	onClickUseAdapter,
	onClickUseExtensions,
	setProgress
} from "./events";

/**
 * 初期化処理
 * ・プログレスバーのDOMを取得して保持する
 * ・画面の各要素にイベントを割り当てる
 */
const onLoad = () => {
	const url_to_input = document.getElementById(ID.INPUT.URL_TO) as HTMLInputElement;
	url_to_input.value = URL_TO;

	const progress = document.getElementById(ID.PROGRESS) as HTMLProgressElement;
	setProgress(progress);

	console.log("add event listeners...");
	document.getElementById(ID.SEND.ONCE)?.addEventListener("click", onClickSingleSend);
	document.getElementById(ID.SEND.PARALLEL)?.addEventListener("click", onClickParallelSend);
	document.getElementById(ID.SEND.SERIAL)?.addEventListener("click", onClickSerialSend);

	document.getElementById(ID.USE.NO_CACHE)?.addEventListener("click", onClickUseNoCache);
	document.getElementById(ID.USE.ADAPTER)?.addEventListener("click", onClickUseAdapter);
	document.getElementById(ID.USE.EXTENSIONS)?.addEventListener("click", onClickUseExtensions);
}
window.onload = onLoad;
