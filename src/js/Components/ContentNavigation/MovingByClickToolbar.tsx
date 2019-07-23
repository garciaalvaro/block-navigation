import { pr_store } from "utils/data/plugin";
import { Div, Button } from "utils/components";
import { MovingBlock } from "./MovingBlock";

type withSelectProps = {
	moving_block: ReturnType<Selectors["getMovingBlock"]>;
};

type withDispatchProps = {
	resetMoving: ActionCreators["resetMoving"];
};

type Props = withSelectProps & withDispatchProps;

const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

export const MovingByClickToolbar = compose([
	withSelect<withSelectProps>(select => ({
		moving_block: select(pr_store).getMovingBlock()
	})),
	withDispatch<withDispatchProps>(dispatch => ({
		resetMoving: dispatch(pr_store).resetMoving
	}))
])((props: Props) => {
	const { moving_block, resetMoving } = props;

	return (
		<Div id="moving_by_click_toolbar">
			<MovingBlock block_name={moving_block.block_name} />
			<Button
				classes={["button-text", "button-cancel_move"]}
				onClick={resetMoving}
			>
				{__("Cancel Move")}
			</Button>
		</Div>
	);
});
