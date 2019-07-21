import { pr_store } from "utils/data/plugin";
import { Block } from "Components/Block/Block";
import { Div, Button } from "utils/components";

type withSelect = {
	moving_block: ReturnType<Selectors["getMovingBlock"]>;
};
type withDispatch = {
	finishMoving: ActionCreators["finishMoving"];
};
type Props = withSelect & withDispatch;

const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

export const MovingByClickToolbar = compose([
	withSelect<withSelect>(select => {
		const { getMovingBlock } = select(pr_store);

		return {
			moving_block: getMovingBlock()
		};
	}),
	withDispatch<withDispatch>(dispatch => {
		const { finishMoving } = dispatch(pr_store);

		return {
			finishMoving
		};
	})
])((props => {
	const { moving_block, finishMoving } = props;

	return (
		<Div id="moving_by_click_toolbar">
			<Block id={moving_block.id} />
			<Button
				classes={["button-text", "button-cancel_move"]}
				onClick={finishMoving}
			>
				{__("Cancel Move")}
			</Button>
		</Div>
	);
}) as React.ComponentType<Props>);
