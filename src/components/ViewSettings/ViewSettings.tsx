import React, { FunctionComponent } from "react";
import { Fragment } from "@wordpress/element";

import { PluginInfo } from "./PluginInfo";
import { ColorScheme } from "./ColorScheme";

export const ViewSettings: FunctionComponent = () => {
	return (
		<Fragment>
			<PluginInfo />

			<ColorScheme />
		</Fragment>
	);
};
