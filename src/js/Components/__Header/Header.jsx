import { pr_store } from "utils/data/plugin";
import Title from "./Title";
import BlockData from "./_BlockData";
import { Div } from "utils/components";
import withBeginMove from "../../utils/HOC/_withBeginMove";
import withFinishMove from "../../utils/HOC/_withFinishMove";

const { BlockIcon } = wp.editor;
const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;
const { Component } = wp.element;

class Header extends Component {
	getEvents = () => {
		const {
			client_id,
			triggerSelectBlock,
			selectBlock,
			can_move,
			move_type,
			moving_block,
			is_selected,
			beginMove,
			finishMove
		} = this.props;
		const events = {
			onClick: () => {
				triggerSelectBlock(true);
				if (is_selected) {
					selectBlock(null);
				} else {
					selectBlock(client_id);
				}
			}
		};

		if (can_move && move_type !== "by_click") {
			events.onDragStart = beginMove;
			events.onDragEnd = () => {
				if (moving_block.client_id !== false) {
					finishMove();
				}
			};
			events.draggable = true;
		}

		return events;
	};

	render() {
		const { client_id, use_events } = this.props;
		const events = use_events ? this.getEvents() : {};

		return (
			<BlockData client_id={client_id}>
				{({ attributes, name, title, icon }) => (
					<Div className="block-header" {...events}>
						<Div className="svg-container block-icon">
							<BlockIcon icon={icon} />
						</Div>
						<Title attributes={attributes} name={name} title={title} />
					</Div>
				)}
			</BlockData>
		);
	}
}

export default compose([
	withSelect((select, { client_id }) => {
		const { getMoveType, getMovingBlock } = select(pr_store);
		const { isBlockSelected } = select("core/editor");

		return {
			move_type: getMoveType(),
			moving_block: getMovingBlock(),
			is_selected: isBlockSelected(client_id)
		};
	}),
	withDispatch(dispatch => {
		const { selectBlock } = dispatch("core/editor");
		const { triggerSelectBlock } = dispatch(pr_store);

		return {
			selectBlock,
			triggerSelectBlock
		};
	}),
	withBeginMove,
	withFinishMove
])(Header);
