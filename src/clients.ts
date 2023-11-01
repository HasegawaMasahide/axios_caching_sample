import axios, { AxiosAdapter, AxiosPromise } from "axios";
import { setup } from "axios-cache-adapter";
import { ICacheLike, cacheAdapterEnhancer } from "axios-extensions";
import { CACHE_MAX_AGE_SEC } from "./constant";
import LRUCache from "lru-cache";

const with_no_cache = axios.create();

const with_adapter = setup({
	cache: {
		maxAge: CACHE_MAX_AGE_SEC * 1000,	// ms
		debug: true,
		exclude: {
			query: false
		}
	}
});

const cacheLike: ICacheLike<AxiosPromise<any>> = new LRUCache({
	ttl: CACHE_MAX_AGE_SEC * 1000, 	// ms
	max: 100
});
const with_extensions = axios.create({
	adapter: cacheAdapterEnhancer(
		axios.defaults.adapter as AxiosAdapter,
		{
			defaultCache: cacheLike
		}
	)
});

export { with_no_cache, with_adapter, with_extensions };
