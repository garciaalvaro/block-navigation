import l from "../../utils/#";
import Html from "../Utils/_Html";
import PluginInfo from "./PluginInfo";
import ColorSchemeControl from "./ColorSchemeControl";
import DropGuidesControl from "./DropGuidesControl";
import DevSettingsPanel from "./DevSettingsPanel";

const Settings = () => {
	return (
		<Html id="bn-panel-settings">
			<PluginInfo />
			<ColorSchemeControl />
			<DropGuidesControl />
			<DevSettingsPanel />
		</Html>
	);
};

export default Settings;
