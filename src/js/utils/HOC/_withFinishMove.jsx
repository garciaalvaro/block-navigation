import l, { pr_store } from "..";

const { compose } = wp.compose;
const { Component } = wp.element;
const { withSelect, withDispatch } = wp.data;

const withFinishMove = WrappedComponent => {
	return class extends Component {
		finishMove = () => {
			const {
				moving_block,
				removeMovingBlock,
				expandBlock,
				updateMouseOverBlock,
				triggerSelectBlock,
				selectBlock
			} = this.props;
			const {
				client_id: moving_client_id,
				was_expanded: moving_was_expanded
			} = moving_block;

			removeMovingBlock();

			triggerSelectBlock(true);
			selectBlock(moving_client_id);

			if (moving_was_expanded) {
				expandBlock(moving_client_id);
			}

			updateMouseOverBlock(false, false);
		};

		render() {
			const { finishMove, props } = this;

			return <WrappedComponent {...props} finishMove={finishMove} />;
		}
	};
};

export default compose([
	withSelect(select => {
		const { getMovingBlock } = select(pr_store);

		return {
			moving_block: getMovingBlock()
		};
	}),
	withDispatch(dispatch => {
		const {
			removeMovingBlock,
			expandBlock,
			updateMouseOverBlock,
			triggerSelectBlock
		} = dispatch(pr_store);
		const { selectBlock } = dispatch("core/editor");

		return {
			removeMovingBlock,
			expandBlock,
			updateMouseOverBlock,
			triggerSelectBlock,
			selectBlock
		};
	}),
	withFinishMove
]);
