import { CACHE_MAX_AGE_SEC } from "./constant";

let id: NodeJS.Timeout;
let remain: number = CACHE_MAX_AGE_SEC * 1000;
let running = false;

const setValue = (progress: HTMLProgressElement, value: number) => progress.value = value;

const init = (progress: HTMLProgressElement) => {
	progress.value = CACHE_MAX_AGE_SEC * 1000;
	progress.max = CACHE_MAX_AGE_SEC * 1000;

	if (id) {
		clearInterval(id);
	}
}

const fire = (progress: HTMLProgressElement) => {
	if (running) {
		return;
	}


	running = true;
	const start = new Date().getTime();
	init(progress);

	id = setInterval(() => {
		const now = new Date().getTime();
		const diff = now - start;	// 経過した時間（ミリ秒）
		remain = CACHE_MAX_AGE_SEC * 1000 - diff;

		if (remain > 0) {
			setValue(progress, CACHE_MAX_AGE_SEC * 1000 - diff);
		} else {
			setValue(progress, 0);
			clearInterval(id);
			remain = CACHE_MAX_AGE_SEC * 1000;
			running = false;
		}
	}, 10);
}

export default fire;
