import { get, isArray } from "lodash";
import { create, getTextContent } from "@wordpress/rich-text";

import { block_types } from "utils/data/block_types";

const getImageUrl = (block: Block): string[] => {
	const { attributes, name } = block;
	const attribute = get(attributes, block_types[name].path);

	return isArray(attribute) ? attribute.map(({ url }) => url) : [attribute];
};

const getText = (block: Block): string | null => {
	const { attributes, name } = block;

	// Get the html string from the path provided
	const html_string = get(attributes, block_types[name].path);

	if (!html_string) {
		return null;
	}

	// Create a richText instance
	const rich_text = create({ html: html_string });
	// Get the text from the richText instance
	const text = getTextContent(rich_text);
	// If there is no text Rich Text returns the "Object replacement character",
	// which looks as if there is an empty string.
	return text.replace("￼", "");
};

export const getContent = (block: Block) => {
	const { name } = block;

	if (block_types[name].type === "text") {
		return getText(block);
	}

	if (block_types[name].type === "image") {
		return getImageUrl(block);
	}

	return null;
};
