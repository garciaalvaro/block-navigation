import { Div, Button } from "utils/components";
import { pr_store } from "utils/data/plugin";

type Props = {
	tab_open: State["tab_open"];
	openTab: ActionCreators["openTab"];
};

const { __ } = wp.i18n;
const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;

const tabs: { value: State["tab_open"]; label: string }[] = [
	{ value: "navigation", label: __("Navigation") },
	{ value: "settings", label: __("Settings") }
];

export const Tabs = compose([
	withDispatch(dispatch => ({ openTab: dispatch(pr_store).openTab() })),
	withSelect(select => ({
		tab_open: select(pr_store).getTabOpen()
	}))
])((props => {
	const { tab_open, openTab } = props;

	return (
		<Div id="tabs">
			{tabs.map(({ value, label }) => (
				<Button
					key={value}
					classes={["button-tab", tab_open === value ? "is-active" : null]}
					onClick={() => openTab(value)}
				>
					{label}
				</Button>
			))}
		</Div>
	);
}) as React.ComponentType<Props>);
