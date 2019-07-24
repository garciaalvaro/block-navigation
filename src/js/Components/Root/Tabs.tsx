import { Div, Button } from "utils/components";
import { pr_store } from "utils/data/plugin";

interface WithDispatchProps {
	setView: ActionCreators["setView"];
}

interface WithSelectProps {
	view: ReturnType<Selectors["getView"]>;
}

type Props = WithDispatchProps & WithSelectProps;

const { __ } = wp.i18n;
const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;

const tabs: { value: State["view"]; label: string }[] = [
	{ value: "navigation", label: __("Navigation") },
	{ value: "settings", label: __("Settings") }
];

export const Tabs: React.ComponentType = compose([
	withDispatch<WithDispatchProps>(dispatch => ({
		setView: dispatch(pr_store).setView
	})),
	withSelect<WithSelectProps>(select => ({
		view: select(pr_store).getView()
	}))
])((props: Props) => {
	const { view, setView } = props;

	return (
		<Div id="tabs">
			{tabs.map(({ value, label }) => (
				<Button
					key={value}
					classes={[
						"button",
						"button-tab",
						view === value ? "is-active" : null
					]}
					onClick={() => setView(value)}
				>
					{label}
				</Button>
			))}
		</Div>
	);
});
