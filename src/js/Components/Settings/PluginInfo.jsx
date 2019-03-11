import l, { icons, plugin_name } from "../../utils";
import Div, { H3, Span } from "../Utils/_Html";

const { __ } = wp.i18n;

const PluginInfo = () => {
	return (
		<Div id="bn-plugin-info">
			<Div id="bn-plugin-info-logo">{icons.logo}</Div>
			<Div id="bn-plugin-info-container">
				<H3 id="bn-plugin-info-name">{plugin_name}</H3>
				<Span id="bn-plugin-info-description">
					{__("Block Navigation panel with useful features.")}
				</Span>
			</Div>
		</Div>
	);
};

export default PluginInfo;
