import { icons, plugin_title, Div, H3, Span } from "utils";

const { __ } = wp.i18n;

const Info = props => {
	return (
		<Div id="plugin-info">
			<Div id="plugin-info-logo">{icons.logo}</Div>
			<Div id="plugin-info-container">
				<H3 id="plugin-info-name">{plugin_title}</H3>
				<Span id="plugin-info-description">
					{__("Block Navigation panel with useful features.")}
				</Span>
			</Div>
		</Div>
	);
};

export default Info;
