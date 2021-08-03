import type { BlocksContent } from "../types";

export const blocks_content: BlocksContent = {
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
