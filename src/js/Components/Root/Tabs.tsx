import { Div, Button } from "utils/components";
import { pr_store } from "utils/data/plugin";

interface WithSelectProps extends Pick<State, "view"> {}

interface WithDispatchProps extends Pick<ActionCreators, "setView"> {}

interface Props extends WithSelectProps, WithDispatchProps {}

const { __ } = wp.i18n;
const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;

const tabs: { value: State["view"]; label: string }[] = [
	{ value: "navigation", label: __("Navigation") },
	{ value: "settings", label: __("Settings") }
];

export const Tabs: React.ComponentType = compose(
	withSelect<WithSelectProps>(select => ({
		view: select(pr_store).getView()
	})),
	withDispatch<WithDispatchProps>(dispatch => ({
		setView: dispatch(pr_store).setView
	}))
)((props: Props) => {
	const { view, setView } = props;

	return (
		<Div id="tabs">
			{tabs.map(({ value, label }) => (
				<Button
					key={value}
					classes={[
						"button",
						"button-tab",
						view === value ? "is_active" : null
					]}
					onClick={() => setView(value)}
				>
					{label}
				</Button>
			))}
		</Div>
	);
});
