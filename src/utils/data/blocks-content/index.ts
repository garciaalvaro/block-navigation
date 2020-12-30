import { applyFilters } from "@wordpress/hooks";

import "./core";
import "./kadence";
import "./melonpan";

export const blocks_content = applyFilters(
	"blockNavigation.addBlockContentAttributePath",
	{}
) as BlocksContent;
