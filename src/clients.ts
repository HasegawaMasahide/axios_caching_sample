import axios, { AxiosAdapter } from "axios";
import { setup } from "axios-cache-adapter";
import { cacheAdapterEnhancer } from "axios-extensions";

const with_no_cache = axios.create();

const with_adapter = setup({
	cache: {
		maxAge: 5 * 60 * 1000,	// ms
		debug: true,
		exclude: {
			query: false
		}
	}
});

const with_extensions = axios.create({
	adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter)
});

export { with_no_cache, with_adapter, with_extensions };
