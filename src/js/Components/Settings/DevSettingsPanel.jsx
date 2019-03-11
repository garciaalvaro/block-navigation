import l from "../../utils";
import DevModeControl from "./DevModeControl";

const { __ } = wp.i18n;
const { PanelBody } = wp.components;

const DevSettingsPanel = () => {
	return (
		<PanelBody
			initialOpen={false}
			title={__("Development Settings")}
			className="bn-development-container bn-panel"
		>
			<DevModeControl />
		</PanelBody>
	);
};

export default DevSettingsPanel;
