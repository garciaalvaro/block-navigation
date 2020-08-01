import React, { FunctionComponent } from "react";
import { Fragment } from "@wordpress/element";

import { Icons, icons } from "@/utils/data/icons";

interface Props {
	icon: keyof Icons;
}

export const Icon: FunctionComponent<Props> = props => {
	const { icon } = props;

	return <Fragment>{icon && icons[icon] ? icons[icon] : null}</Fragment>;
};
