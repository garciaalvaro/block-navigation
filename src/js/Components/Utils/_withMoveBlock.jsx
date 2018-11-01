import l, { plugin_namespace } from "../../utils/#";
import withFinishMove from "./_withFinishMove";

const { compose } = wp.compose;
const { Component } = wp.element;
const { withSelect, withDispatch } = wp.data;

const withMoveBlock = WrappedComponent => {
	return class extends Component {
		moveBlock = destination => {
			const {
				client_id,
				parent_client_id,
				finishMove,
				moving_block,
				index,
				prev_client_id,
				is_end_of_list,
				moveBlockToPosition
			} = this.props;
			const {
				client_id: moving_client_id,
				parent_client_id: moving_parent_client_id,
				index: moving_index
			} = moving_block;
			const origin = {};
			const dest = {};

			if (destination === "to") {
				origin.client_id = moving_client_id;
				origin.parent_client_id = moving_parent_client_id;
				origin.index = moving_index;

				dest.client_id = client_id;
				dest.parent_client_id = parent_client_id;
				dest.index = is_end_of_list ? index + 1 : index;
			} else if (destination === "up") {
				origin.client_id = client_id;
				origin.parent_client_id = parent_client_id;
				origin.index = index;

				dest.client_id = prev_client_id;
				dest.parent_client_id = parent_client_id;
				dest.index = index - 1;
			} else if (destination === "down") {
				origin.client_id = client_id;
				origin.parent_client_id = parent_client_id;
				origin.index = index;

				dest.client_id = prev_client_id;
				dest.parent_client_id = parent_client_id;
				dest.index = index + 2;
			}

			if (origin.client_id === dest.client_id || dest.index < 0) {
				finishMove();

				return;
			}

			const is_same_level =
				origin.parent_client_id === dest.parent_client_id;

			dest.index =
				dest.index && origin.index < dest.index && is_same_level
					? dest.index - 1
					: dest.index;

			moveBlockToPosition(
				origin.client_id,
				origin.parent_client_id,
				dest.parent_client_id,
				// TODO: remove next argument in next Gutenberg version (4.2).
				// This parameter refers to layouts which will be deprecated.
				// We just pass the 5th argument which will correspond to
				// the 4th argument in the next version.
				dest.index,
				dest.index
			);

			finishMove();
		};

		render() {
			const { props, moveBlock } = this;

			return <WrappedComponent {...props} moveBlock={moveBlock} />;
		}
	};
};

export default compose([
	withSelect((select, { client_id, parent_client_id }) => {
		const { getBlockIndex, getAdjacentBlockClientId } = select(
			"core/editor"
		);
		const { getMovingBlock } = select(plugin_namespace);

		return {
			index: getBlockIndex(client_id, parent_client_id),
			prev_client_id: getAdjacentBlockClientId(client_id, -1),
			moving_block: getMovingBlock()
		};
	}),
	withDispatch(dispatch => {
		const { moveBlockToPosition } = dispatch("core/editor");

		return {
			moveBlockToPosition
		};
	}),
	withFinishMove,
	withMoveBlock
]);
