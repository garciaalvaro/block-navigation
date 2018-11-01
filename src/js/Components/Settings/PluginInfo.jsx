import l, { icons, plugin_name } from "../../utils/#";
import Html from "../Utils/_Html";

const { __ } = wp.i18n;

const PluginInfo = () => {
	return (
		<Html id="bn-plugin-info">
			<Html id="bn-plugin-info-logo">{icons.logo}</Html>
			<Html id="bn-plugin-info-container">
				<Html html_element="h3" id="bn-plugin-info-name">
					{plugin_name}
				</Html>
				<Html html_element="span" id="bn-plugin-info-description">
					{__("Block Navigation panel with useful features.")}
				</Html>
			</Html>
		</Html>
	);
};

export default PluginInfo;
