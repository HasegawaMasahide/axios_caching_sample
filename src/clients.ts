import axios from "axios";

const with_no_cache = axios.create();

const with_adapter = with_no_cache;	// @TODO


const with_extensions = with_no_cache;	// @TODO

export { with_no_cache, with_adapter, with_extensions };
