import { Div, Span, Img } from "utils/components";
import { block_types } from "utils/data/block_types";

type Props = { block: any };

const { get, isArray } = lodash;
const { create, getTextContent } = wp.richText;

const getImageUrl = block => {
	const { attributes, name } = block;
	const attribute = get(attributes, block_types[name].path);

	return isArray(attribute) ? attribute.map(({ url }) => url) : [attribute];
};

const getText = block => {
	const { attributes, name } = block;

	// Get the html string from the path provided
	const html_string = get(attributes, block_types[name].path);
	// l("html_string", html_string);
	if (!html_string) {
		return null;
	}

	// Create a richText instance
	const rich_text = create({ html: html_string });
	// Get the text from the richText instance
	const text = getTextContent(rich_text);
	// l("text", text);
	// If there is no text Rich Text returns the "Object replacement character",
	// which looks as if there is an empty string.
	return text.replace("￼", "");
};

const getContent = block => {
	const { name } = block;

	if (block_types[name].type === "text") {
		return getText(block);
	}

	if (block_types[name].type === "image") {
		return getImageUrl(block);
	}

	return null;
};

export const BlockContent: React.ComponentType<Props> = props => {
	const { block } = props;
	const content = block_types[block.name] ? getContent(block) : null;

	if (!content) {
		return null;
	}

	if (isArray(content)) {
		return (
			<Div classes={["block-content", "content_type-image"]}>
				{content.map((url, index) => (
					<Div key={index} classes="block-image-container">
						<Img classes="block-image" src={url} />
					</Div>
				))}
			</Div>
		);
	}

	return (
		<Span classes={["block-content", "content_type-text"]}>{content}</Span>
	);
};
