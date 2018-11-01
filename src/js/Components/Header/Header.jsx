import l, { plugin_namespace } from "../../utils/#";
import Title from "./Title";
import BlockData from "./_BlockData";
import Html from "../Utils/_Html";
import withBeginMove from "../Utils/_withBeginMove";
import withFinishMove from "../Utils/_withFinishMove";

const { isString } = lodash;
const { Dashicon } = wp.components;
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
			beginMove,
			finishMove
		} = this.props;
		const events = {
			onClick: () => {
				triggerSelectBlock(true);
				selectBlock(client_id);
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
					<Html className="block-header" {...events}>
						<Html className="svg-container block-icon">
							{isString(icon) ? <Dashicon icon={icon} /> : icon}
						</Html>
						<Title
							attributes={attributes}
							name={name}
							title={title}
						/>
					</Html>
				)}
			</BlockData>
		);
	}
}

export default compose([
	withSelect(select => {
		const { getMoveType, getMovingBlock } = select(plugin_namespace);

		return {
			move_type: getMoveType(),
			moving_block: getMovingBlock()
		};
	}),
	withDispatch(dispatch => {
		const { selectBlock } = dispatch("core/editor");
		const { triggerSelectBlock } = dispatch(plugin_namespace);

		return {
			selectBlock,
			triggerSelectBlock
		};
	}),
	withBeginMove,
	withFinishMove
])(Header);
