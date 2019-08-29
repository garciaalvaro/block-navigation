import { store_prefix } from "utils/data";
import { Div, Button } from "utils/Components";
import { ToolbarMovingBlock } from "./ToolbarMovingBlock";

interface WithSelectProps extends Pick<State, "moving_block"> {}

interface WithDispatchProps extends Pick<ActionCreators, "resetMoving"> {}

interface Props extends WithSelectProps, WithDispatchProps {}

const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

export const Toolbar: React.ComponentType = compose([
	withSelect<WithSelectProps>(select => ({
		moving_block: select(store_prefix).getMovingBlock()
	})),
	withDispatch<WithDispatchProps>(dispatch => ({
		resetMoving: dispatch(store_prefix).resetMoving
	}))
])((props: Props) => {
	const { moving_block, resetMoving } = props;

	return (
		<Div id="moving_by_click_toolbar">
			<ToolbarMovingBlock block_name={moving_block.block_name} />
			<Button
				className={["button-text", "button-cancel_move"]}
				onClick={resetMoving}
			>
				{__("Cancel Move")}
			</Button>
		</Div>
	);
});
