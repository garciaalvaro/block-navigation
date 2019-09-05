import { __ } from "@wordpress/i18n";
import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import { SelectControl } from "@wordpress/components";

import { addPrefix } from "utils/tools";
import { store_slug, color_schemes } from "utils/data";

interface WithSelectProps extends Pick<State, "color_scheme"> {}

interface WithDispatchProps extends Pick<ActionCreators, "setColorScheme"> {}

interface Props extends WithSelectProps, WithDispatchProps {}

export const ControlColorScheme: React.ComponentType = compose([
	withSelect<WithSelectProps>(select => ({
		color_scheme: select(store_slug).getColorScheme()
	})),
	withDispatch<WithDispatchProps>(dispatch => ({
		setColorScheme: dispatch(store_slug).setColorScheme
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
