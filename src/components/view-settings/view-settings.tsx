import React from "react";
import type { FunctionComponent } from "react";

import styles from "./styles.styl";
import {
	PluginInfo,
	BlockInfoDisplayed,
	ColorScheme,
	DetachedPosition,
	DevMode,
} from "./components";

export const ViewSettings: FunctionComponent = () => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<PluginInfo />

				<ColorScheme />

				<DetachedPosition />

				<BlockInfoDisplayed />

				<DevMode />
			</div>
		</div>
	);
};
