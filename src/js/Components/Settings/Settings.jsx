import l from "../../utils/#";
import Html from "../Utils/_Html";
import PluginInfo from "./PluginInfo";
import ColorSchemeControl from "./ColorSchemeControl";
import DropGuidesControl from "./DropGuidesControl";

const Settings = () => {
	return (
		<Html id="bn-panel-settings">
			<PluginInfo />
			<ColorSchemeControl />
			<DropGuidesControl />
		</Html>
	);
};

export default Settings;
