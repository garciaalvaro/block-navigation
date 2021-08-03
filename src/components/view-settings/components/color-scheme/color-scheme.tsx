import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { SelectControl } from "@wordpress/components";

import { color_schemes } from "@/utils";
import { store_slug } from "@/store";

import styles from "./styles.styl";

export const ColorScheme: FunctionComponent = () => {
	const color_scheme = useSelect(select => select(store_slug).color_scheme());

	const { setColorScheme } = useDispatch(store_slug);

	return (
		<div className={styles.container}>
			<SelectControl
				label={__("Color scheme:")}
				value={color_scheme}
				onChange={(selected: string) => setColorScheme(selected)}
				options={color_schemes}
			/>
		</div>
	);
};
