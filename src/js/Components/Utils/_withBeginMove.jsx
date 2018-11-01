import l, { plugin_namespace } from "../../utils/#";

const { isNil } = lodash;
const { compose } = wp.compose;
const { Component } = wp.element;
const { withSelect, withDispatch } = wp.data;

const withBeginMove = WrappedComponent => {
	return class extends Component {
		beginMove = e => {
			const {
				client_id,
				parent_client_id,
				is_parent,
				template_lock,
				index,
				next_client_id,
				name,
				updateMovingBlock,
				updateMouseOverBlock,
				collapseBlock
			} = this.props;
			let move_type = "by_click";

			if (!isNil(e.dataTransfer)) {
				move_type = "by_drag";

				// Needed for Firefox to work.
				// https://stackoverflow.com/a/33465176 | CC BY-SA 3.0
				e.dataTransfer.setData("text", "");
			}

			setTimeout(() => {
				updateMovingBlock(
					move_type,
					client_id,
					parent_client_id,
					template_lock,
					name,
					index
				);

				if (is_parent) {
					collapseBlock(client_id);
				}
				if (move_type === "by_drag" && next_client_id !== null) {
					updateMouseOverBlock(next_client_id, false);
				}
			}, 0);
		};

		render() {
			const { props, beginMove } = this;

			return <WrappedComponent {...props} beginMove={beginMove} />;
		}
	};
};

export default compose([
	withSelect((select, { client_id, parent_client_id }) => {
		const {
			getBlockIndex,
			getTemplateLock,
			getAdjacentBlockClientId,
			getBlockName
		} = select("core/editor");

		return {
			index: getBlockIndex(client_id, parent_client_id),
			template_lock: getTemplateLock(parent_client_id),
			next_client_id: getAdjacentBlockClientId(client_id, 1),
			name: getBlockName(client_id)
		};
	}),
	withDispatch(dispatch => {
		const {
			updateMovingBlock,
			updateMouseOverBlock,
			collapseBlock
		} = dispatch(plugin_namespace);
		const { moveBlockToPosition } = dispatch("core/editor");

		return {
			moveBlockToPosition,
			updateMovingBlock,
			updateMouseOverBlock,
			collapseBlock
		};
	}),
	withBeginMove
]);
