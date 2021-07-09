import React, { FunctionComponent } from "react";

import styles from "./view-settings.styl";
import { PluginInfo } from "./plugin-info";
import { BlockInfoDisplayed } from "./block-info-displayed";
import { ColorScheme } from "./color-scheme";
import { DetachedPosition } from "./detached-position";
import { DevMode } from "./dev-mode";

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
