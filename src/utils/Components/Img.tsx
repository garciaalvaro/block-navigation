import React, { FunctionComponent } from "react";
import { prepareProps } from "@/utils/tools/prepareProps";

export const Img: FunctionComponent<ComponentProps> = props => {
	return <img {...prepareProps(props)} />;
};
