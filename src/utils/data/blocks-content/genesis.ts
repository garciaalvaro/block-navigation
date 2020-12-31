import { addFilter } from "@wordpress/hooks";

const blocks_content: BlocksContent = {
	"genesis-blocks/gb-testimonial": {
		type: "text",
		path: ["testimonialContent", "0", "props", "children", "0"],
	},
	"genesis-blocks/gb-profile-box": {
		type: "text",
		path: ["profileName", "0"],
	},
	"genesis-blocks/gb-notice": {
		type: "text",
		path: ["noticeTitle"],
	},
	"genesis-blocks/gb-drop-cap": {
		type: "text",
		path: ["dropCapContent", "0", "props", "children", "0"],
	},
	"genesis-blocks/gb-button": {
		type: "text",
		path: ["buttonText"],
	},
	"genesis-blocks/gb-accordion": {
		type: "text",
		path: ["accordionTitle", "0"],
	},
	"genesis-blocks/gb-cta": {
		type: "text",
		path: ["ctaTitle", "0"],
	},
	"genesis-blocks/gb-pricing-table-title": {
		type: "text",
		path: ["title"],
	},
	"genesis-blocks/gb-columns": {
		type: "image",
		path: ["backgroundImgURL"],
	},
	"genesis-blocks/gb-column": {
		type: "image",
		path: ["backgroundImgURL"],
	},
	"genesis-blocks/gb-container": {
		type: "image",
		path: ["containerImgURL"],
	},
};

addFilter(
	"blockNavigation.addBlockContentAttributePath",
	"genesis-blocks",
	other => ({
		...other,
		...blocks_content,
	})
);
