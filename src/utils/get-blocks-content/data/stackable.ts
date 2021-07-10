import type { BlocksContent } from "../types";

export const blocks_content: BlocksContent = {
	"ugb/accordion": { type: "text", path: ["title"] },
	"ugb/blockquote": { type: "text", path: ["text"] },
	"ugb/button": { type: "text", path: ["button1Text"] },
	"ugb/cta": { type: "text", path: ["title"] },
	"ugb/card": { type: "text", path: ["title1"] },
	"ugb/count-up": { type: "text", path: ["title1"] },
	"ugb/expand": { type: "text", path: ["title"] },
	"ugb/feature-grid": { type: "text", path: ["title1"] },
	"ugb/header": { type: "text", path: ["title"] },
	"ugb/heading": { type: "text", path: ["title"] },
	"ugb/notification": { type: "text", path: ["title"] },
	"ugb/number-box": { type: "text", path: ["title1"] },
	"ugb/pricing-box": { type: "text", path: ["title1"] },
	"ugb/team-member": { type: "text", path: ["name1"] },
	"ugb/testimonial": { type: "text", path: ["blockDescription"] },
	"ugb/icon-list": { type: "text", path: ["text"] },
	"ugb/columns": {
		type: "image",
		path: ["blockBackgroundBackgroundMediaUrl"],
	},
	"ugb/container": {
		type: "image",
		path: ["blockBackgroundBackgroundMediaUrl"],
	},
	"ugb/image-box": { type: "image", path: ["image1FullUrl"] },
};
