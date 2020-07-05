import "./ViewSettings.styl";
import { Div } from "utils/components";
import { ControlPluginInfo } from "./ControlPluginInfo";
import { ControlColorScheme } from "./ControlColorScheme";

export const ViewSettings: React.ComponentType = () => {
	return (
		<Div id="settings">
			<ControlPluginInfo />

			<ControlColorScheme />
		</Div>
	);
};
