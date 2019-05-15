import l, { pr_store } from "utils";
import classNames from "classnames";
import TogglePanel from "./TogglePanel";
import Div from "../Utils/_Html";
import Navigation from "../Navigation/Navigation";
import Settings from "../Settings/Settings";

const { split } = lodash;
const { compose, withState } = wp.compose;
const { withSelect } = wp.data;
const { Component } = wp.element;

class Root extends Component {
	openPanel = panel => {
		this.props.setState({ current_panel: panel });
	};

	getContainerClassName = () => {
		const {
			color_scheme,
			moving,
			move_type,
			drop_guides,
			current_panel
		} = this.props;
		const color_scheme_array = split(color_scheme, "-");

		return classNames(
			{
				drop_guides: drop_guides,
				moving: moving,
				"no-moving": !moving
			},
			`color_scheme-type-${color_scheme_array[0]}`,
			`color_scheme-name-${color_scheme_array[1]}`,
			`move_type-${move_type}`,
			`current_panel-${current_panel}`
		);
	};

	render() {
		const { openPanel, getContainerClassName } = this;
		const { current_panel } = this.props;

		return (
			<Div id="bn-container" className={getContainerClassName()}>
				<TogglePanel openPanel={openPanel} current_panel={current_panel} />
				{current_panel === "navigation" ? <Navigation /> : <Settings />}
			</Div>
		);
	}
}

export default compose([
	withState({ current_panel: "navigation" }),
	withSelect(select => {
		const { getDropGuides, getColorScheme, getMoveType, getMoving } = select(
			pr_store
		);

		return {
			drop_guides: getDropGuides(),
			color_scheme: getColorScheme(),
			move_type: getMoveType(),
			moving: getMoving()
		};
	})
])(Root);
