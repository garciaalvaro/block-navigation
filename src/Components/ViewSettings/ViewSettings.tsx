import React, { FunctionComponent } from "react";
import "./ViewSettings.styl";
import { Div } from "utils/components";
import { ControlPluginInfo } from "./ControlPluginInfo";
import { ControlColorScheme } from "./ControlColorScheme";

export const ViewSettings: FunctionComponent = () => {
	return (
		<Div id="settings">
			<ControlPluginInfo />

			<ControlColorScheme />
		</Div>
	);
};
