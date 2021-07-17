import { addFilter, applyFilters } from "@wordpress/hooks";

import { data } from "./data";
import type { Util, BlocksContent } from "./types";

export const getBlocksContent: Util = () => {
	addFilter(
		"blockNavigation.addBlockContentAttributePath",
		"core",
		other => ({
			...other,
			...data.core,
		})
	);

	addFilter(
		"blockNavigation.addBlockContentAttributePath",
		"genesis-blocks",
		other => ({
			...other,
			...blocks_content,
		})
	);

	addFilter(
		"blockNavigation.addBlockContentAttributePath",
		"kadence",
		other => ({
			...other,
			...blocks_content,
		})
	);

	addFilter(
		"blockNavigation.addBlockContentAttributePath",
		"melonpan",
		other => ({ ...other, ...blocks_content })
	);

	addFilter("blockNavigation.addBlockContentAttributePath", "ugb", other => ({
		...other,
		...blocks_content,
	}));

	const blocks_content = applyFilters(
		"blockNavigation.addBlockContentAttributePath",
		{}
	) as BlocksContent;

	return blocks_content;
};
