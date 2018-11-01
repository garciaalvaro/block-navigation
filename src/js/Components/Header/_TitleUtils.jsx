import l, { blocks_info } from "../../utils/#";

const { withState } = wp.compose;
const { Component } = wp.element;
const { get, isString, isArray, isEqual } = lodash;

// Modified from https://stackoverflow.com/a/11230103 | CC BY-SA 3.0
const cleanText = html_string =>
	html_string
		.replace(/<[^>]*>/g, " ")
		.replace(/\s+/g, " ")
		.replace("&nbsp;", " ")
		.trim();

const getText = (attributes, path) => {
	let text;

	// Get text from the path provided
	text = get(attributes, path);

	// Clean the text of html tags
	text = cleanText(text);

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
	let content = "";

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

		if (
			name !== prevProps.name ||
			!isEqual(attributes, prevProps.attributes)
		) {
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
