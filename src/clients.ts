import axios from "axios";
import { setup } from "axios-cache-adapter";

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

const with_extensions = with_no_cache;	// @TODO

export { with_no_cache, with_adapter, with_extensions };
