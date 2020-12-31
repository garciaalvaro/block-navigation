import React, { FunctionComponent } from "react";

import styles from "./ViewSettings.styl";
import { PluginInfo } from "./PluginInfo";
import { ColorScheme } from "./ColorScheme";
import { DetachedPosition } from "./DetachedPosition";
import { DevMode } from "./DevMode";

export const ViewSettings: FunctionComponent = () => {
	return (
		<div className={styles.container}>
			<PluginInfo />

			<ColorScheme />

			<DetachedPosition />

			<DevMode />
		</div>
	);
};
