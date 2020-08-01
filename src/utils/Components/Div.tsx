import React, { FunctionComponent } from "react";
import { prepareProps } from "@/utils/tools/prepareProps";

export const Div: FunctionComponent<ComponentProps> = props => {
	const { children, ...rest } = props;

	return <div {...prepareProps(rest)}>{children}</div>;
};
