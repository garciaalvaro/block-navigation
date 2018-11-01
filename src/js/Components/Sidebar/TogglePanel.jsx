import l from "../../utils/#";
import classNames from "classnames";
import Html from "../Utils/_Html";

const { __ } = wp.i18n;
const { Button } = wp.components;
const { Component } = wp.element;

class TogglePanel extends Component {
	getButtonClassName = panel => {
		const { current_panel } = this.props;

		return classNames(
			{
				"is-active": current_panel === panel
			},
			"toggle-panel"
		);
	};

	render() {
		const { getButtonClassName } = this;
		const { openPanel } = this.props;

		return (
			<Html id="bn-toggle-panel">
				<Button
					className={getButtonClassName("navigation")}
					onClick={() => openPanel("navigation")}
				>
					<Html html_element="span">{__("Navigation")}</Html>
				</Button>
				<Button
					className={getButtonClassName("settings")}
					onClick={() => openPanel("settings")}
				>
					<Html html_element="span">{__("Settings")}</Html>
				</Button>
			</Html>
		);
	}
}

export default TogglePanel;
