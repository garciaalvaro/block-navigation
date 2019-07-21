import { pr_store } from "utils/data/plugin";
import { Div } from "utils/components";
import { Tabs } from "./Tabs";
import { ContentNavigation } from "Components/ContentNavigation/ContentNavigation";
// import { ContentSettings } from "Components/ContentSettings/ContentSettings";

type withSelect = {
	tab_open: ReturnType<Selectors["getTabOpen"]>;
	is_moving: ReturnType<Selectors["isMoving"]>;
	color_scheme: ReturnType<Selectors["getColorScheme"]>;
};
type Props = withSelect;

const { withSelect } = wp.data;

export const Root = withSelect<withSelect>(select => {
	const { getTabOpen, isMoving, getColorScheme } = select(pr_store);

	return {
		tab_open: getTabOpen(),
		is_moving: isMoving(),
		color_scheme: getColorScheme()
	};
})((props => {
	const { color_scheme, tab_open, is_moving } = props;
	const classes = [
		`color_scheme-type-${color_scheme.type}`,
		`color_scheme-name-${color_scheme.value}`,
		is_moving ? "is_moving" : "no-is_moving"
	];

	return (
		<Div id="container" classes={classes}>
			<Tabs />
			<ContentNavigation />
			{/* {tab_open === "navigation" ? <ContentNavigation /> : <ContentSettings />} */}
		</Div>
	);
}) as React.ComponentType<Props>);
