import * as utils from "@/utils";

import type { Util } from "./types";

export const mockUtils: Util = (function_name, mock) => {
	const mockedFunction =
		typeof mock === "function"
			? (...args: unknown[]) => mock(...args)
			: () => mock;

	(
		utils[function_name] as unknown as jest.MockedFunction<
			typeof mockedFunction
		>
	).mockImplementation(mockedFunction);
};
