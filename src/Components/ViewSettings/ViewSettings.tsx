import "./ViewSettings.styl";
import { Div } from "utils/Components";
import { ControlPluginInfo } from "./ControlPluginInfo";
import { ControlColorScheme } from "./ControlColorScheme";

export const ViewSettings: React.ComponentType = props => {
	return (
		<Div id="settings">
			<ControlPluginInfo />
			<ControlColorScheme />
		</Div>
	);
};
