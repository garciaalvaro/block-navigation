import { addPrefix } from "utils/tools";
import { store_prefix, color_schemes } from "utils/data";

interface WithSelectProps extends Pick<State, "color_scheme"> {}

interface WithDispatchProps extends Pick<ActionCreators, "setColorScheme"> {}

interface Props extends WithSelectProps, WithDispatchProps {}

const { __ } = wp.i18n;
const { SelectControl } = wp.components;
const { compose } = wp.compose;
const { withDispatch, withSelect } = wp.data;

export const ControlColorScheme: React.ComponentType = compose([
	withSelect<WithSelectProps>(select => ({
		color_scheme: select(store_prefix).getColorScheme()
	})),
	withDispatch<WithDispatchProps>(dispatch => ({
		setColorScheme: dispatch(store_prefix).setColorScheme
	}))
])((props: Props) => {
	const { setColorScheme, color_scheme } = props;

	return (
		<SelectControl
			className={addPrefix(["control", "control-select", "color_scheme"])}
			label={__("Color scheme:")}
			value={color_scheme}
			onChange={(selected: string) => setColorScheme(selected)}
			options={color_schemes}
		/>
	);
});
