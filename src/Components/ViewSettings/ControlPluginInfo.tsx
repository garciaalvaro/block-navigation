import { __ } from "@wordpress/i18n";

import "./ControlPluginInfo.styl";
import { Icon, Div, H3, Span } from "utils/Components";
import { plugin_title } from "utils/data";

export const ControlPluginInfo: React.ComponentType = props => {
	return (
		<Div id="info">
			<Div id="info-logo">
				<Icon icon="logo" />
			</Div>

			<Div id="info-container">
				<H3 id="info-name">{plugin_title}</H3>

				<Span id="info-description">
					{__("Block Navigation panel with useful features.")}
				</Span>
			</Div>
		</Div>
	);
};
