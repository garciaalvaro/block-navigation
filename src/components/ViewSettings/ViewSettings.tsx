import React, { FunctionComponent } from "react";

import { PluginInfo } from "./PluginInfo";
import { ColorScheme } from "./ColorScheme";

interface Props {
	container_height: number;
}

export const ViewSettings: FunctionComponent<Props> = props => {
	return (
		<div style={{ height: props.container_height }}>
			<PluginInfo />

			<ColorScheme />
		</div>
	);
};
