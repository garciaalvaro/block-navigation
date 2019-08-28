import { Div } from "utils/Components";
import { pr_store } from "utils/data";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonMoveTo } from "./ButtonMoveTo";
import { ButtonsMove } from "./ButtonsMove";
import { ButtonCopyId } from "./ButtonCopyId";
import { ButtonBlockData } from "./ButtonBlockData";

interface WithSelectProps extends Pick<State, "color_scheme"> {}

interface OwnProps extends MenuProps {}

const { withSelect } = wp.data;

export const BlockMenu: React.ComponentType<OwnProps> = withSelect<
	WithSelectProps,
	OwnProps
>(select => ({
	color_scheme: select(pr_store).getColorScheme()
}))(props => {
	const { color_scheme } = props;
	const [type, value] = color_scheme.split("-");

	return (
		<Div
			className={[
				"menu",
				`color_scheme-type-${type}`,
				`color_scheme-name-${value}`
			]}
		>
			<ButtonEdit {...props} />
			<ButtonMoveTo {...props} />
			<ButtonsMove {...props} />
			<ButtonCopyId {...props} />
			<ButtonBlockData {...props} />
		</Div>
	);
});
