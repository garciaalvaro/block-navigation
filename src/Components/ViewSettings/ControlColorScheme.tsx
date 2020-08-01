import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { SelectControl } from "@wordpress/components";

import { addPrefix } from "@/utils/tools";
import { color_schemes } from "@/utils/data";

export const ControlColorScheme: FunctionComponent = () => {
	const color_scheme = useSelect(select =>
		select("melonpan/block-navigation").getColorScheme()
	);

	const { setColorScheme } = useDispatch("melonpan/block-navigation");

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
