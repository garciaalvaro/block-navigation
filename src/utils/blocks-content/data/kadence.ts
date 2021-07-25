import type { BlocksContent } from "../types";

export const blocks_content: BlocksContent = {
	"kadence/advancedheading": { type: "text", path: ["content"] },
	"kadence/advancedbtn": { type: "text", path: ["btns", "0", "text"] },
	"kadence/form": { type: "text", path: ["fields", "0", "label"] },
	"kadence/advancedgallery": { type: "image", path: ["images"] },
	"kadence/rowlayout": { type: "image", path: ["bgImg"] },
	"kadence/column": { type: "image", path: ["backgroundImg", "0", "bgImg"] },
	"kadence/pane": { type: "text", path: ["title", "0"] },
	"kadence/infobox": { type: "text", path: ["title", "0"] },
	"kadence/iconlist": { type: "text", path: ["items", "0", "text"] },
	"kadence/testimonials": {
		type: "text",
		path: ["testimonials", "0", "title"],
	},
};
