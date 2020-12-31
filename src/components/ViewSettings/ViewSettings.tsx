import React, { FunctionComponent } from "react";

import styles from "./ViewSettings.styl";
import { PluginInfo } from "./PluginInfo";
import { BlockInfoDisplayed } from "./BlockInfoDisplayed";
import { ColorScheme } from "./ColorScheme";
import { DetachedPosition } from "./DetachedPosition";
import { DevMode } from "./DevMode";

interface Props {
	container_height: number;
}

const tab_height = 50;

export const ViewSettings: FunctionComponent<Props> = props => {
	const { container_height } = props;

	return (
		<div
			className={styles.container}
			style={{ height: container_height - tab_height }}
		>
			<PluginInfo />

			<ColorScheme />

			<DetachedPosition />

			<BlockInfoDisplayed />

			<DevMode />
		</div>
	);
};
