import React, { FunctionComponent } from "react";

import styles from "./ViewSettings.styl";
import { PluginInfo } from "./PluginInfo";
import { ColorScheme } from "./ColorScheme";

export const ViewSettings: FunctionComponent = () => {
	return (
		<div className={styles.container}>
			<PluginInfo />

			<ColorScheme />
		</div>
	);
};
