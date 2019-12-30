import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { SelectControl } from "@wordpress/components";

import { addPrefix } from "utils/tools";
import { store_slug, color_schemes } from "utils/data";

export const ControlColorScheme: React.ComponentType = props => {
	const color_scheme = useSelect<State["color_scheme"]>(select =>
		select(store_slug).getColorScheme()
	);
	const { setColorScheme } = useDispatch(store_slug);

	return (
		<SelectControl
			className={addPrefix(["control", "control-select", "color_scheme"])}
			label={__("Color scheme:")}
			value={color_scheme}
			onChange={(selected: string) => setColorScheme(selected)}
			options={color_schemes}
		/>
	);
};
