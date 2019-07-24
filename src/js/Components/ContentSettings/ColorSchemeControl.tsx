import { addPrefix } from "utils/tools/addPrefix";
import { pr_store } from "utils/data/plugin";
import { color_schemes } from "utils/data/color_schemes";

interface WithSelectProps {
	color_scheme: ReturnType<Selectors["getColorScheme"]>;
}

interface WithDispatchProps {
	setColorScheme: ActionCreators["setColorScheme"];
}

type Props = WithSelectProps & WithDispatchProps;

const { __ } = wp.i18n;
const { SelectControl } = wp.components;
const { compose } = wp.compose;
const { withDispatch, withSelect } = wp.data;

export const ColorSchemeControl: React.ComponentType = compose([
	withSelect(select => ({
		color_scheme: select(pr_store).getColorScheme()
	})),
	withDispatch(dispatch => ({
		setColorScheme: dispatch(pr_store).setColorScheme
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
