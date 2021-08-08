import * as utils from "@/utils";

export type Util = (
	function_name: keyof typeof utils,
	mock: (() => unknown) | unknown
) => void;
