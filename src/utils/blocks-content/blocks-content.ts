import { addFilter, applyFilters } from "@wordpress/hooks";

import { data } from "./data";
import type { Util, BlocksContent } from "./types";

const getBlocksContent: Util = () => {
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
			...data.genesis,
		})
	);

	addFilter(
		"blockNavigation.addBlockContentAttributePath",
		"kadence",
		other => ({
			...other,
			...data.kadence,
		})
	);

	addFilter(
		"blockNavigation.addBlockContentAttributePath",
		"melonpan",
		other => ({ ...other, ...data.melonpan })
	);

	addFilter("blockNavigation.addBlockContentAttributePath", "ugb", other => ({
		...other,
		...data.stackable,
	}));

	const blocks_content = applyFilters(
		"blockNavigation.addBlockContentAttributePath",
		{}
	) as BlocksContent;

	return blocks_content;
};

export const blocks_content = getBlocksContent();
