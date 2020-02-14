import { useSelect } from "@wordpress/data";

import "./BlockMenu.styl";
import { Div } from "utils/Components";
import { store_slug } from "utils/data";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonMoveTo } from "./ButtonMoveTo";
import { ButtonsMove } from "./ButtonsMove";
import { ButtonCopyId } from "./ButtonCopyId";
import { ButtonBlockData } from "./ButtonBlockData";

export const BlockMenu: React.ComponentType<MenuProps> = props => {
	const color_scheme = useSelect<State["color_scheme"]>(select =>
		select(store_slug).getColorScheme()
	);

	const [type, value] = color_scheme.split("-");

	return (
		<Div
			className={[
				"menu",
				`color_scheme-type-${type}`,
				`color_scheme-name-${value}`
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
