import { pr_store } from "utils/data/plugin";
import { Div, Button } from "utils/components";
import { MovingBlock } from "./MovingBlock";

interface WithSelectProps {
	moving_block: ReturnType<Selectors["getMovingBlock"]>;
}

interface WithDispatchProps {
	resetMoving: ActionCreators["resetMoving"];
}

type Props = WithSelectProps & WithDispatchProps;

const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

export const MovingByClickToolbar: React.ComponentType = compose([
	withSelect<WithSelectProps>(select => ({
		moving_block: select(pr_store).getMovingBlock()
	})),
	withDispatch<WithDispatchProps>(dispatch => ({
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
