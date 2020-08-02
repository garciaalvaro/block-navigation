import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { SelectControl } from "@wordpress/components";

import styles from "./ColorScheme.styl";
import { color_schemes, store_slug } from "@/utils/data";

export const ColorScheme: FunctionComponent = () => {
	const color_scheme = useSelect(select =>
		select(store_slug).getColorScheme()
	);

	const { setColorScheme } = useDispatch(store_slug);

	return (
		<SelectControl
			className={styles.container}
			label={__("Color scheme:")}
			value={color_scheme}
			onChange={(selected: string) => setColorScheme(selected)}
			options={color_schemes}
		/>
	);
};
