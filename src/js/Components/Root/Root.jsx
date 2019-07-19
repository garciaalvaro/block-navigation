import l, { Div, pr_store } from "utils";
import Tabs from "./Tabs";
import Navigation from "../Navigation/Navigation";
import Settings from "../Settings/Settings";

const { compose, withState } = wp.compose;
const { withSelect } = wp.data;

const Root = props => {
	const {
		setState,
		color_scheme,
		show_dd_guides,
		tab_open,
		is_moving,
		moving_type
	} = props;
	const [color_type, color_name] = color_scheme.split("-");
	const openTab = tab => setState({ tab_open: tab });
	const classes = [
		`color_scheme-type-${color_type}`,
		`color_scheme-name-${color_name}`,
		`moving_type-${moving_type}`,
		`tab_open-${tab_open}`,
		show_dd_guides ? "show_dd_guides" : null,
		is_moving ? "is_moving" : "no-is_moving"
	];

	return (
		<Div id="container" classes={classes}>
			<Tabs openTab={openTab} tab_open={tab_open} />
			{tab_open === "navigation" ? <Navigation /> : <Settings />}
		</Div>
	);
};

export default compose([
	withState({ tab_open: "navigation" }),
	withSelect(select => {
		const { getSettings, getIsMoving, getMovingType } = select(pr_store);

		return {
			...getSettings(),
			is_moving: getIsMoving(),
			moving_type: getMovingType()
		};
	})
])(Root);
