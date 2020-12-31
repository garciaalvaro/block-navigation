import { addFilter } from "@wordpress/hooks";

const blocks_content: BlocksContent = {
	"melonpan-block/images": { type: "image", path: ["images"] },
};

addFilter(
	"blockNavigation.addBlockContentAttributePath",
	"melonpan",
	other => ({ ...other, ...blocks_content })
);
