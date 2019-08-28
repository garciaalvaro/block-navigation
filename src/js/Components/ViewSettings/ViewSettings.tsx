import { Div } from "utils/components";
import { PluginInfo } from "./PluginInfo";
import { ColorSchemeControl } from "./ColorSchemeControl";

export const ViewSettings: React.ComponentType = props => {
	return (
		<Div id="settings">
			<PluginInfo />
			<ColorSchemeControl />
		</Div>
	);
};
