import { __ } from "@wordpress/i18n";
import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";

import { store_slug } from "utils/data";
import { Div, Button } from "utils/Components";
import { ToolbarMovingBlock } from "./ToolbarMovingBlock";

interface WithSelectProps extends Pick<State, "moving_block"> {}

interface WithDispatchProps extends Pick<ActionCreators, "resetMoving"> {}

interface Props extends WithSelectProps, WithDispatchProps {}

export const Toolbar: React.ComponentType = compose([
	withSelect<WithSelectProps>(select => ({
		moving_block: select(store_slug).getMovingBlock()
	})),
	withDispatch<WithDispatchProps>(dispatch => ({
		resetMoving: dispatch(store_slug).resetMoving
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
