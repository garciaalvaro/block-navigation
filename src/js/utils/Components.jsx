import addPrefix from "./addPrefix";

const DivForwardRef = wp.element.forwardRef(
	({ children, id, classes, ...rest }, ref) => (
		<div id={addPrefix(id)} className={addPrefix(classes)} {...rest} ref={ref}>
			{children}
		</div>
	)
);
const Div = ({ children, classes, id, ...rest }) => (
	<div id={addPrefix(id)} className={addPrefix(classes)} {...rest}>
		{children}
	</div>
);
const Span = ({ children, classes, id, ...rest }) => (
	<span id={addPrefix(id)} className={addPrefix(classes)} {...rest}>
		{children}
	</span>
);
const H3 = ({ children, classes, id, ...rest }) => (
	<h3 id={addPrefix(id)} className={addPrefix(classes)} {...rest}>
		{children}
	</h3>
);
const Hr = ({ classes, id, ...rest }) => (
	<hr id={addPrefix(id)} className={addPrefix(classes)} {...rest} />
);

export { DivForwardRef, Div, Span, H3, Hr };
