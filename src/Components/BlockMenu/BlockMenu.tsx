import React, { FunctionComponent } from "react";
import { useSelect } from "@wordpress/data";

import "./BlockMenu.styl";
import { Div } from "utils/components";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonMoveTo } from "./ButtonMoveTo";
import { ButtonsMove } from "./ButtonsMove";
import { ButtonCopyId } from "./ButtonCopyId";
import { ButtonBlockData } from "./ButtonBlockData";

export const BlockMenu: FunctionComponent<MenuProps> = props => {
	const color_scheme = useSelect(select =>
		select("melonpan/block-navigation").getColorScheme()
	);

	const [type, value] = color_scheme.split("-");

	return (
		<Div
			className={[
				"menu",
				`color_scheme-type-${type}`,
				`color_scheme-name-${value}`,
			]}
		>
			<ButtonEdit {...props} />
			<ButtonMoveTo {...props} />
			<ButtonsMove {...props} />
			<ButtonCopyId {...props} />
			<ButtonBlockData {...props} />
		</Div>
	);
};
