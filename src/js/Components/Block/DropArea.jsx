import l, { plugin_namespace } from "../../utils/#";
import Div from "../Utils/_Html";
import withMoveBlock from "../Utils/_withMoveBlock";

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
		const { isMouseOver } = select(plugin_namespace);
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
		const { getMoveType } = select(plugin_namespace);

		return {
			move_type: getMoveType()
		};
	}),
	withDispatch(dispatch => {
		const { updateMouseOverBlock } = dispatch(plugin_namespace);

		return {
			updateMouseOverBlock
		};
	}),
	withMoveBlock
])(DropArea);
