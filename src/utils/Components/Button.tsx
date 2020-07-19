import React, { FunctionComponent } from "react";
import { prepareProps } from "utils/tools/prepareProps";

export const Button: FunctionComponent<ComponentProps> = props => {
	const { children, ...rest } = props;

	return (
		<button type="button" {...prepareProps(rest)}>
			{children}
		</button>
	);
};
