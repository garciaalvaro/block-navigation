import l from "../../utils";

const { forwardRef } = wp.element;

const DivForwardRef = forwardRef(({ children, ...rest }, ref) => (
	<div {...rest} ref={ref}>
		{children}
	</div>
));

export default DivForwardRef;
