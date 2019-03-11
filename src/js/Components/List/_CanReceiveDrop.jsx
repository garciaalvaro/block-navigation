import l from "../../utils";

const { compose, withState } = wp.compose;
const { Component } = wp.element;
const { withSelect } = wp.data;

class CanReceiveDrop extends Component {
	canReceiveDrop = () => {
		const {
			parent_client_id,
			moving_block,
			block_type_can_be_inserted
		} = this.props;
		const is_same_parent =
			parent_client_id === moving_block.parent_client_id;

		if (moving_block.template_lock === "insert") {
			if (is_same_parent) {
				return true;
			} else {
				return false;
			}
		}

		return block_type_can_be_inserted;
	};

	componentDidMount = () => {
		const { moving, setState } = this.props;

		if (moving) {
			setState({ can_receive_drop: this.canReceiveDrop() });
		}
	};

	componentDidUpdate = prevProps => {
		const { moving, setState } = this.props;

		if (!prevProps.moving && moving) {
			setState({ can_receive_drop: this.canReceiveDrop() });
		} else if (prevProps.moving && !moving) {
			setState({ can_receive_drop: false });
		}
	};

	render() {
		const { children, can_receive_drop } = this.props;

		return children(can_receive_drop);
	}
}

export default compose([
	withState({ can_receive_drop: false }),
	withSelect((select, { parent_client_id, moving_block }) => {
		const { canInsertBlockType } = select("core/editor");

		return {
			block_type_can_be_inserted: canInsertBlockType(
				moving_block.name,
				parent_client_id
			)
		};
	})
])(CanReceiveDrop);
