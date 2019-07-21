import { blocks_info } from "utils";

const { withState } = wp.compose;
const { Component } = wp.element;
const { get, isString, isArray, isEqual } = lodash;
const { create, getTextContent } = wp.richText;

const getText = (attributes, path) => {
	// Get the html string from the path provided
	const html_string = get(attributes, path);
	// Create a richText instance
	const rich_text = create({ html: html_string });
	// Get the text from the richText instance
	let text = getTextContent(rich_text);
	// If there is no text Rich Text returns the "Object replacement character",
	// which looks as if there is an empty string.
	text = text.replace("￼", "");

	return text;
};

const getImageUrl = (attributes, path) => {
	let attribute = get(attributes, path);
	let url = [];

	if (isString(attribute)) {
		url = [attribute];
	} else if (isArray(attribute)) {
		url = attribute.map(image => image.url);
	}

	return url;
};

const getBlockContent = (name, attributes) => {
	const block = blocks_info[name];

	if (block === undefined || get(attributes, block.path) === undefined) {
		return { content: "", type: "" };
	}

	const { type, path } = block;
	let content;

	if (type === "text") {
		content = getText(attributes, path);
	} else if (type === "image") {
		content = getImageUrl(attributes, path);
	}

	return { content, type };
};

class TitleUtils extends Component {
	componentDidMount = () => {
		this.updateBlockContent();
	};

	componentDidUpdate = prevProps => {
		const { name, attributes } = this.props;

		if (name !== prevProps.name || !isEqual(attributes, prevProps.attributes)) {
			this.updateBlockContent();
		}
	};

	updateBlockContent = () => {
		const { name, attributes, setState } = this.props;
		const { content, type } = getBlockContent(name, attributes);

		setState({
			content: content,
			type: type
		});
	};

	render() {
		const { children, content, type } = this.props;

		return children({ content, type });
	}
}

export default withState({
	content: "",
	type: ""
})(TitleUtils);
