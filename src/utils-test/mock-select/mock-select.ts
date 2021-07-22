import { select } from "@wordpress/data";

import type { Util } from "./types";

export const mockSelect: Util = selectors => {
	const mockedFunction = () => selectors;

	(
		select as unknown as jest.MockedFunction<typeof mockedFunction>
	).mockImplementation(mockedFunction);
};
