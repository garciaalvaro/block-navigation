import { pr_store } from "utils/data/plugin";
import { Div } from "utils/components";
import { withMoveBlock } from "utils/HOC/withMoveBlock";

const { Component } = wp.element;
const { compose } = wp.compose;
const { withSelect, withDispatch, select } = wp.data;

class DropArea extends Component {
	getEvents = () => {
		const {
			client_id,
			is_end_of_list,
			move_type,
			updateMouseOverBlock,
			moveBlock
		} = this.props;
		const { isMouseOver } = select(pr_store);
		const events = {};

		if (move_type === "by_click") {
			events.onMouseEnter = () =>
				updateMouseOverBlock(client_id, is_end_of_list);
			events.onMouseLeave = () => {
				if (isMouseOver(client_id, is_end_of_list)) {
					updateMouseOverBlock(false, false);
				}
			};
			events.onClick = () => moveBlock("to");
		} else if (move_type === "by_drag") {
			events.onDragEnter = () =>
				updateMouseOverBlock(client_id, is_end_of_list);
			events.onDragLeave = () => {
				if (isMouseOver(client_id, is_end_of_list)) {
					updateMouseOverBlock(false, false);
				}
			};
			events.onDrop = () => moveBlock("to");
		}

		return events;
	};

	render() {
		const events = this.getEvents();

		return <Div className="drop_area" {...events} />;
	}
}

export default compose([
	withSelect(select => {
		const { getMoveType } = select(pr_store);

		return {
			move_type: getMoveType()
		};
	}),
	withDispatch(dispatch => {
		const { updateMouseOverBlock } = dispatch(pr_store);

		return {
			updateMouseOverBlock
		};
	}),
	withMoveBlock
])(DropArea);
