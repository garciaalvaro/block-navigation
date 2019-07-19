import l, { Div, Span } from "utils";

const { __ } = wp.i18n;
const { Button } = wp.components;

const Tabs = props => {
	const { openTab, tab_open } = props;

	return (
		<Div id="bn-toggle-panel">
			<Button
				className={["tab", tab_open === "navigation" ? "is-active" : null]}
				onClick={() => openTab("navigation")}
			>
				<Span>{__("Navigation")}</Span>
			</Button>
			<Button
				className={["tab", tab_open === "settings" ? "is-active" : null]}
				onClick={() => openTab("settings")}
			>
				<Span>{__("Settings")}</Span>
			</Button>
		</Div>
	);
};

export default Tabs;
