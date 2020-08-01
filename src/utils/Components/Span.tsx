import React, { FunctionComponent } from "react";
import { prepareProps } from "@/utils/tools/prepareProps";

export const Span: FunctionComponent<ComponentProps> = props => {
	const { children, ...rest } = props;

	return <span {...prepareProps(rest)}>{children}</span>;
};
