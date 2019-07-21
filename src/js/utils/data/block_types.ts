export type BlockTypeData = Record<string, { type: string; path: string[] }>;

export const block_types: BlockTypeData = {
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
	"core/heading": { type: "text", path: ["content"] }
};

// export const addCore = (block_types: BlockTypeData): BlockTypeData => {
// 	return {
// 		...block_types,
// 		...{
// 			"core/gallery": { type: "image", path: ["images"] },
// 			"core/media-text": { type: "image", path: ["mediaUrl"] },
// 			"core/image": { type: "image", path: ["url"] },
// 			"core/cover": { type: "text", path: ["title"] },
// 			"core/preformatted": { type: "text", path: ["content"] },
// 			"core/audio": { type: "text", path: ["caption"] },
// 			"core/button": { type: "text", path: ["text"] },
// 			"core/pullquote": { type: "text", path: ["value"] },
// 			"core/quote": { type: "text", path: ["value"] },
// 			"core/paragraph": { type: "text", path: ["content"] },
// 			"core/list": { type: "text", path: ["values"] },
// 			"core/verse": { type: "text", path: ["content"] },
// 			"core/heading": { type: "text", path: ["content"] }
// 		}
// 	};
// };

// wp.hooks.addFilter("bn.addBlocks", "addCore", addCore);
