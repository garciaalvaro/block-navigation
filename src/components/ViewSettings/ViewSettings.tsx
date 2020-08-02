import React, { FunctionComponent } from "react";

import styles from "./ViewSettings.styl";
import { PluginInfo } from "./PluginInfo";
import { ColorScheme } from "./ColorScheme";

interface Props {
	container_height: number;
}

export const ViewSettings: FunctionComponent<Props> = props => {
	return (
		<div
			className={styles.container}
			style={{ height: props.container_height }}
		>
			<PluginInfo />

			<ColorScheme />
		</div>
	);
};
