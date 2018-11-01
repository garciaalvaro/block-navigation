import l from "../../utils/#";

const Html = ({ children, html_element, ...rest }) => {
	let element;

	switch (html_element) {
		case "span":
			element = <span {...rest}>{children}</span>;
			break;
		case "h3":
			element = <h3 {...rest}>{children}</h3>;
			break;
		default:
			element = <div {...rest}>{children}</div>;
	}

	return element;
};

export default Html;
