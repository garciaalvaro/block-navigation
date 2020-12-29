import { applyFilters } from "@wordpress/hooks";

type BlockContentInfo = Record<
	string,
	{ type: "text" | "image"; path: string[] }
>;

export const blocks_content_info: BlockContentInfo = {
	...(applyFilters(
		"blockNavigation.addBlockContentAttributePath",
		{}
	) as BlockContentInfo),

	"melonpan-block/images": { type: "image", path: ["images"] },
	"core/gallery": { type: "image", path: ["images"] },
	"core/media-text": { type: "image", path: ["mediaUrl"] },
	"core/image": { type: "image", path: ["url"] },
	"core/cover": { type: "text", path: ["title"] },
	"core/preformatted": { type: "text", path: ["content"] },
	"core/audio": { type: "text", path: ["caption"] },
	"core/button": { type: "text", path: ["text"] },
	"core/pullquote": { type: "text", path: ["value"] },
	"core/quote": { type: "text", path: ["value"] },
	"core/paragraph": { type: "text", path: ["content"] },
	"core/list": { type: "text", path: ["values"] },
	"core/verse": { type: "text", path: ["content"] },
	"core/heading": { type: "text", path: ["content"] },
	"core/block": { type: "text", path: ["title"] },
};
