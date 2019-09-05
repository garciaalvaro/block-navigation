import { forwardRef } from "@wordpress/element";

import { prepareProps } from "utils/tools/prepareProps";

export const DivRef = forwardRef<HTMLDivElement, ComponentProps>(
	(props, ref) => {
		const { children, ...rest } = props;

		return (
			<div {...prepareProps(rest)} ref={ref}>
				{children}
			</div>
		);
	}
);
