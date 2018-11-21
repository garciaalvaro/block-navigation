import l from "../../utils/#";
import Div from "../Utils/_Html";
import PluginInfo from "./PluginInfo";
import ColorSchemeControl from "./ColorSchemeControl";
import DropGuidesControl from "./DropGuidesControl";
import DevSettingsPanel from "./DevSettingsPanel";

const Settings = () => {
	return (
		<Div id="bn-panel-settings">
			<PluginInfo />
			<ColorSchemeControl />
			<DropGuidesControl />
			<DevSettingsPanel />
		</Div>
	);
};

export default Settings;
