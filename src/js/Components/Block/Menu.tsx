import { Div } from "utils/components";
import { pr_store } from "utils/data/plugin";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonMoveTo } from "./ButtonMoveTo";
import { ButtonsMove } from "./ButtonsMove";
import { ButtonCopyId } from "./ButtonCopyId";
import { ButtonBlockData } from "./ButtonBlockData";

type withSelectProps = {
	color_scheme: ReturnType<Selectors["getColorScheme"]>;
};

type ParentProps = {
	id: string;
	parent_id: string;
	template_lock: string | undefined;
	block: import("wordpress__blocks").BlockInstance;
	can_move: boolean;
	index: number;
	close: Function;
};

const { withSelect } = wp.data;

export const Menu = withSelect<withSelectProps, ParentProps>(select => ({
	color_scheme: select(pr_store).getColorScheme()
}))(props => {
	const { color_scheme } = props;
	const [type, value] = color_scheme.split("-");

	return (
		<Div
			classes={[
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
