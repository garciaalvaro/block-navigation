import l from "../../utils";
import classNames from "classnames";
import Div, { Span } from "../Utils/_Html";

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
			<Div id="bn-toggle-panel">
				<Button
					className={getButtonClassName("navigation")}
					onClick={() => openPanel("navigation")}
				>
					<Span>{__("Navigation")}</Span>
				</Button>
				<Button
					className={getButtonClassName("settings")}
					onClick={() => openPanel("settings")}
				>
					<Span>{__("Settings")}</Span>
				</Button>
			</Div>
		);
	}
}

export default TogglePanel;
