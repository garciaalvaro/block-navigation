import { Button } from "utils/Components";
import { store_prefix } from "utils/data";

interface WithSelectProps extends Pick<State, "view"> {}

interface WithDispatchProps extends Pick<ActionCreators, "setView"> {}

interface OwnProps {
	tab_value: State["view"];
	tab_label: string;
}

interface Props extends WithSelectProps, WithDispatchProps, OwnProps {}

const { useCallback } = wp.element;
const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;

export const Tab: React.ComponentType<OwnProps> = compose(
	withSelect<WithSelectProps>(select => ({
		view: select(store_prefix).getView()
	})),
	withDispatch<WithDispatchProps>(dispatch => ({
		setView: dispatch(store_prefix).setView
	}))
)((props: Props) => {
	const { view, setView, tab_value, tab_label } = props;
	const onClick = useCallback(() => setView(tab_value), []);

	return (
		<Button
			className={[
				"button",
				"button-tab",
				tab_value === view ? "is_active" : null
			]}
			onClick={onClick}
		>
			{tab_label}
		</Button>
	);
});
