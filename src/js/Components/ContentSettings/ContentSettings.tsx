import { Div } from "utils/components";
import { PluginInfo } from "./PluginInfo";
import { ColorSchemeControl } from "./ColorSchemeControl";

export const ContentSettings: React.ComponentType = props => {
	return (
		<Div id="settings">
			<PluginInfo {...props} />
			<ColorSchemeControl {...props} />
		</Div>
	);
};
